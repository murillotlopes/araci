import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormError } from '../form-error/form-error';

export type FormCheckboxValue = string | number | boolean | null;

export type FormCheckboxItem =
  | string
  | number
  | {
    label: string;
    value: FormCheckboxValue;
    disabled?: boolean;
  };

@Component({
  selector: 'app-form-checkbox',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckbox),
      multi: true,
    },
  ],
})
export class FormCheckbox implements ControlValueAccessor {
  @Input() formControlName = '';
  @Input() formGroup!: FormGroup;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() items: FormCheckboxItem[] = [];
  @Input() name = 'checkbox_group_' + Math.random().toString(36).substring(2, 9);
  @Input({ transform: booleanAttribute }) disabled = false;

  value = false;
  selectedValues: FormCheckboxValue[] = [];
  controlDisabled = false;
  inputId = 'form_checkbox_' + Math.random().toString(36).substring(2, 9);

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  get hasItems(): boolean {
    return this.items.length > 0;
  }

  get isDisabled(): boolean {
    return this.disabled || this.controlDisabled;
  }

  get singleCheckboxText(): string {
    return this.placeholder || this.label;
  }

  public onChange = (_value: boolean | FormCheckboxValue[]) => { };
  public onTouched = () => { };

  public writeValue(value: boolean | FormCheckboxValue[] | null): void {
    if (Array.isArray(value)) {
      this.selectedValues = value;
      this.value = this.selectedValues.length > 0;
      return;
    }

    this.value = !!value;
    this.selectedValues = [];
  }

  public registerOnChange(fn: (value: boolean | FormCheckboxValue[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
  }

  public getItemId(index: number): string {
    return `${this.inputId}_${index}`;
  }

  public getItemLabel(item: FormCheckboxItem): string {
    return typeof item === 'object' ? item.label : String(item);
  }

  public getItemValue(item: FormCheckboxItem): FormCheckboxValue {
    return typeof item === 'object' ? item.value : item;
  }

  public isItemDisabled(item: FormCheckboxItem): boolean {
    return this.isDisabled || (typeof item === 'object' && !!item.disabled);
  }

  public isItemChecked(item: FormCheckboxItem): boolean {
    return this.selectedValues.some((value) => Object.is(value, this.getItemValue(item)));
  }

  public toggleSingle(event: Event): void {
    if (this.isDisabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).checked;
    this.onChange(this.value);
    this.onTouched();
  }

  public toggleItem(item: FormCheckboxItem, event: Event): void {
    if (this.isItemDisabled(item)) {
      return;
    }

    const checked = (event.target as HTMLInputElement).checked;
    const itemValue = this.getItemValue(item);

    this.selectedValues = checked
      ? [...this.selectedValues, itemValue]
      : this.selectedValues.filter((value) => !Object.is(value, itemValue));

    this.onChange(this.selectedValues);
    this.onTouched();
  }

}
