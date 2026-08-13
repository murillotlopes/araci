import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormError } from '../../form-error/form-error';

export interface FormInputFileListItem {
  id?: string | number;
  file?: File;
  name: string;
  size?: number;
  type?: string;
  url?: string;
  saved?: boolean;
}

interface FileListViewItem extends FormInputFileListItem {
  previewUrl?: string;
}

@Component({
  selector: 'app-form-input-file-list',
  imports: [FormError],
  templateUrl: './form-input-file-list.html',
  styleUrl: './form-input-file-list.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputFileList),
      multi: true,
    },
  ],
})
export class FormInputFileList implements ControlValueAccessor, OnDestroy {
  @Input() formControlName = '';
  @Input() formGroup?: FormGroup;
  @Input() label = 'Arquivos';
  @Input() buttonLabel = 'Selecionar arquivos';
  @Input() placeholder = 'Arraste arquivos aqui';
  @Input() hint = 'ou clique no botão para selecionar no computador';
  @Input() accept = '';
  @Input() allowedTypes: string[] = [];
  @Input() maxFileSize?: number;
  @Input() maxFiles?: number;
  @Input() multiple = true;
  @Input() disabled = false;

  @Output() filesChange = new EventEmitter<FormInputFileListItem[]>();
  @Output() fileRemoved = new EventEmitter<FormInputFileListItem>();

  @ViewChild('fileInput') private fileInput?: ElementRef<HTMLInputElement>;

  protected value: FileListViewItem[] = [];
  protected isDragging = false;
  protected validationMessages: string[] = [];

  private previewUrls = new Set<string>();
  private onChange: (value: FormInputFileListItem[]) => void = () => {};
  private onTouched: () => void = () => {};

  public ngOnDestroy(): void {
    this.revokePreviews();
  }

  public writeValue(value: FormInputFileListItem[] | null): void {
    this.revokePreviews();
    this.value = (value ?? []).map((item) => this.normalizeItem(item));
  }

  public registerOnChange(fn: (value: FormInputFileListItem[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  protected get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  protected get inputAccept(): string | null {
    const accepted = this.accept || this.allowedTypes.join(',');
    return accepted || null;
  }

  protected get canAddMoreFiles(): boolean {
    return !this.multiple || this.maxFiles === undefined || this.value.length < this.maxFiles;
  }

  protected openFilePicker(): void {
    if (this.disabled || !this.canAddMoreFiles) {
      return;
    }

    this.fileInput?.nativeElement.click();
  }

  protected onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled && this.canAddMoreFiles) {
      this.isDragging = true;
    }
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (this.disabled || !this.canAddMoreFiles) {
      return;
    }

    this.addFiles(event.dataTransfer?.files ?? null);
  }

  protected removeFile(item: FileListViewItem): void {
    if (this.disabled) {
      return;
    }

    if (item.previewUrl && this.previewUrls.has(item.previewUrl)) {
      URL.revokeObjectURL(item.previewUrl);
      this.previewUrls.delete(item.previewUrl);
    }

    this.value = this.value.filter((file) => file !== item);
    this.validationMessages = [];
    this.emitValue();
    this.fileRemoved.emit(this.toOutputItem(item));
  }

  protected formatFileSize(size?: number): string {
    if (size === undefined || Number.isNaN(size)) {
      return 'Tamanho nao informado';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    let currentSize = size;
    let unitIndex = 0;

    while (currentSize >= 1024 && unitIndex < units.length - 1) {
      currentSize /= 1024;
      unitIndex += 1;
    }

    const fractionDigits = currentSize >= 10 || unitIndex === 0 ? 0 : 1;
    return `${currentSize.toFixed(fractionDigits)} ${units[unitIndex]}`;
  }

  protected isImage(item: FileListViewItem): boolean {
    return item.type?.startsWith('image/') === true || this.isImageUrl(item.url);
  }

  protected getFileIcon(item: FileListViewItem): string {
    const type = item.type ?? '';
    const name = item.name.toLowerCase();

    if (type.includes('pdf') || name.endsWith('.pdf')) {
      return 'fa-regular fa-file-pdf';
    }

    if (type.includes('spreadsheet') || name.endsWith('.xls') || name.endsWith('.xlsx')) {
      return 'fa-regular fa-file-excel';
    }

    if (type.includes('word') || name.endsWith('.doc') || name.endsWith('.docx')) {
      return 'fa-regular fa-file-word';
    }

    if (type.includes('zip') || name.endsWith('.zip') || name.endsWith('.rar')) {
      return 'fa-regular fa-file-zipper';
    }

    return 'fa-regular fa-file';
  }

  protected statusLabel(item: FileListViewItem): string {
    return item.saved === true ? 'Salvo' : 'Pendente de envio';
  }

  protected trackFile(_index: number, item: FileListViewItem): string | number {
    return item.id ?? item.name;
  }

  private addFiles(fileList: FileList | null): void {
    if (!fileList || fileList.length === 0) {
      return;
    }

    this.onTouched();
    this.validationMessages = [];

    const selectedFiles = Array.from(fileList);
    const availableSlots = !this.multiple
      ? 1
      : this.maxFiles === undefined
        ? selectedFiles.length
        : this.maxFiles - this.value.length;

    if (availableSlots <= 0) {
      this.validationMessages.push(`Limite de ${this.maxFiles ?? 0} arquivo(s) atingido.`);
      return;
    }

    const acceptedFiles = selectedFiles.slice(0, availableSlots);

    if (selectedFiles.length > acceptedFiles.length) {
      this.validationMessages.push(`Apenas ${availableSlots} arquivo(s) foram adicionados.`);
    }

    const newItems = acceptedFiles.reduce<FileListViewItem[]>((items, file) => {
      const validationMessage = this.validateFile(file);

      if (validationMessage) {
        this.validationMessages.push(validationMessage);
        return items;
      }

      items.push(this.normalizeFile(file));
      return items;
    }, []);

    if (newItems.length === 0) {
      return;
    }

    if (!this.multiple) {
      this.revokePreviews();
    }

    this.value = this.multiple ? [...this.value, ...newItems] : [newItems[0]];
    this.emitValue();
  }

  private validateFile(file: File): string | null {
    if (this.maxFileSize !== undefined && file.size > this.maxFileSize) {
      return `${file.name} excede o limite de ${this.formatFileSize(this.maxFileSize)}.`;
    }

    const acceptedTypes = this.getAcceptedTypes();

    if (acceptedTypes.length > 0 && !acceptedTypes.some((type) => this.matchesType(file, type))) {
      return `${file.name} nao possui um tipo permitido.`;
    }

    return null;
  }

  private getAcceptedTypes(): string[] {
    const entries = [...this.allowedTypes];

    if (this.accept) {
      entries.push(...this.accept.split(','));
    }

    return entries.map((type) => type.trim().toLowerCase()).filter(Boolean);
  }

  private matchesType(file: File, acceptedType: string): boolean {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    if (acceptedType.startsWith('.')) {
      return fileName.endsWith(acceptedType);
    }

    if (acceptedType.endsWith('/*')) {
      return fileType.startsWith(acceptedType.slice(0, -1));
    }

    return fileType === acceptedType;
  }

  private normalizeFile(file: File): FileListViewItem {
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

    if (previewUrl) {
      this.previewUrls.add(previewUrl);
    }

    return {
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl,
      saved: false,
    };
  }

  private normalizeItem(item: FormInputFileListItem): FileListViewItem {
    if (item.file) {
      const normalizedFile = this.normalizeFile(item.file);

      return {
        ...normalizedFile,
        id: item.id ?? normalizedFile.id,
        saved: item.saved ?? false,
      };
    }

    return {
      ...item,
      saved: item.saved ?? true,
      previewUrl: this.isImage(item) ? item.url : undefined,
    };
  }

  private emitValue(): void {
    const files = this.value.map((item) => this.toOutputItem(item));
    this.onChange(files);
    this.filesChange.emit(files);
    this.control?.setValue(files);
    this.control?.markAsDirty();
    this.control?.markAsTouched();
  }

  private toOutputItem(item: FileListViewItem): FormInputFileListItem {
    const { previewUrl: _previewUrl, ...outputItem } = item;
    return outputItem;
  }

  private revokePreviews(): void {
    this.previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    this.previewUrls.clear();
  }

  private isImageUrl(url?: string): boolean {
    return /\.(apng|avif|gif|jpe?g|png|svg|webp)$/i.test(url ?? '');
  }

}
