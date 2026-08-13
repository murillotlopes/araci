import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormError } from '../../form-error/form-error';

export interface FormInputFileItem {
  key: string;
  label: string;
  description?: string;
  accept?: string;
  allowedTypes?: string[];
  maxFileSize?: number;
  required?: boolean;
}

export interface FormInputFileValue {
  key: string;
  file?: File;
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  saved?: boolean;
}

interface FormInputFileSlot extends FormInputFileItem {
  file?: FormInputFileValue;
  error?: string;
  dragging?: boolean;
}

@Component({
  selector: 'app-form-input-file',
  imports: [FormError],
  templateUrl: './form-input-file.html',
  styleUrl: './form-input-file.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputFile),
      multi: true,
    },
  ],
})
export class FormInputFile implements ControlValueAccessor, OnDestroy {
  @Input() formControlName = '';
  @Input() formGroup?: FormGroup;
  @Input() label = 'Documentos';
  @Input() buttonLabel = 'Selecionar arquivo';
  @Input() emptyText = 'Nenhum arquivo carregado';
  @Input() disabled = false;
  @Input()
  set items(items: FormInputFileItem[]) {
    this._items = items ?? [];
    this.syncSlots();
  }
  get items(): FormInputFileItem[] {
    return this._items;
  }

  @Output() filesChange = new EventEmitter<FormInputFileValue[]>();
  @Output() fileRemoved = new EventEmitter<FormInputFileValue>();

  @ViewChildren('fileInput') private fileInputs?: QueryList<ElementRef<HTMLInputElement>>;

  protected slots: FormInputFileSlot[] = [];

  private _items: FormInputFileItem[] = [];
  private value: FormInputFileValue[] = [];
  private onChange: (value: FormInputFileValue[]) => void = () => {};
  private onTouched: () => void = () => {};

  public ngOnDestroy(): void {
    this.clearInputValues();
  }

  public writeValue(value: FormInputFileValue[] | null): void {
    this.value = value ?? [];
    this.syncSlots();
  }

  public registerOnChange(fn: (value: FormInputFileValue[]) => void): void {
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

  protected inputAccept(slot: FormInputFileSlot): string | null {
    const accepted = slot.accept || slot.allowedTypes?.join(',');
    return accepted || null;
  }

  protected openFilePicker(index: number): void {
    if (this.disabled) {
      return;
    }

    this.fileInputs?.get(index)?.nativeElement.click();
  }

  protected onFileInputChange(event: Event, slot: FormInputFileSlot): void {
    const input = event.target as HTMLInputElement;
    this.setSlotFile(slot, input.files?.[0] ?? null);
    input.value = '';
  }

  protected onDragOver(event: DragEvent, slot: FormInputFileSlot): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      slot.dragging = true;
    }
  }

  protected onDragLeave(event: DragEvent, slot: FormInputFileSlot): void {
    event.preventDefault();
    event.stopPropagation();
    slot.dragging = false;
  }

  protected onDrop(event: DragEvent, slot: FormInputFileSlot): void {
    event.preventDefault();
    event.stopPropagation();
    slot.dragging = false;

    if (this.disabled) {
      return;
    }

    this.setSlotFile(slot, event.dataTransfer?.files?.[0] ?? null);
  }

  protected removeFile(slot: FormInputFileSlot): void {
    if (this.disabled || !slot.file) {
      return;
    }

    const removedFile = slot.file;
    slot.file = undefined;
    slot.error = undefined;
    this.emitValue();
    this.fileRemoved.emit(removedFile);
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

  protected formatAcceptedTypes(slot: FormInputFileSlot): string {
    const acceptedTypes = this.getAcceptedTypes(slot);

    if (acceptedTypes.length === 0) {
      return 'Qualquer tipo de arquivo';
    }

    return acceptedTypes.join(', ');
  }

  protected statusLabel(slot: FormInputFileSlot): string {
    if (!slot.file) {
      return this.emptyText;
    }

    return slot.file.saved === true ? 'Carregado' : 'Pendente de envio';
  }

  protected trackSlot(_index: number, slot: FormInputFileSlot): string {
    return slot.key;
  }

  private syncSlots(): void {
    this.slots = this._items.map((item) => ({
      ...item,
      file: this.value.find((file) => file.key === item.key),
    }));
  }

  private setSlotFile(slot: FormInputFileSlot, file: File | null): void {
    this.onTouched();

    if (!file) {
      return;
    }

    const validationMessage = this.validateFile(slot, file);

    if (validationMessage) {
      slot.error = validationMessage;
      return;
    }

    slot.error = undefined;
    slot.file = {
      key: slot.key,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      saved: false,
    };
    this.emitValue();
  }

  private validateFile(slot: FormInputFileSlot, file: File): string | null {
    if (slot.maxFileSize !== undefined && file.size > slot.maxFileSize) {
      return `${file.name} excede o limite de ${this.formatFileSize(slot.maxFileSize)}.`;
    }

    const acceptedTypes = this.getAcceptedTypes(slot);

    if (acceptedTypes.length > 0 && !acceptedTypes.some((type) => this.matchesType(file, type))) {
      return `${file.name} nao possui um tipo permitido.`;
    }

    return null;
  }

  private getAcceptedTypes(slot: FormInputFileSlot): string[] {
    const entries = [...(slot.allowedTypes ?? [])];

    if (slot.accept) {
      entries.push(...slot.accept.split(','));
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

  private emitValue(): void {
    const files = this.slots.flatMap((slot) => (slot.file ? [slot.file] : []));
    this.value = files;
    this.onChange(files);
    this.filesChange.emit(files);
    this.control?.setValue(files);
    this.control?.markAsDirty();
    this.control?.markAsTouched();
  }

  private clearInputValues(): void {
    this.fileInputs?.forEach((input) => {
      input.nativeElement.value = '';
    });
  }

}
