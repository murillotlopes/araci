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

export type FormSelectOptionValue = string | number | boolean | null;

export type FormSelectOption =
  | string
  | number
  | {
      label: string;
      value: FormSelectOptionValue;
      disabled?: boolean;
      hidden?: boolean;
    };

@Component({
  selector: 'app-form-select',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-select.html',
  styleUrl: './form-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelect),
      multi: true,
    },
  ],
})
export class FormSelect implements ControlValueAccessor {
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) label!: string;
  @Input() options: FormSelectOption[] = [];
  @Input() placeholder = 'Selecione uma opção';
  @Input() showPlaceholder = true;
  @Input({ transform: booleanAttribute }) disabled = false;

  value: FormSelectOptionValue = null;
  controlDisabled = false;

  public onChange = (_value: FormSelectOptionValue) => { };
  public onTouched = () => { };

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  get isDisabled(): boolean {
    return this.disabled || this.controlDisabled;
  }

  public writeValue(value: FormSelectOptionValue): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: FormSelectOptionValue) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
  }

  public selectValue(value: FormSelectOptionValue): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  public getOptionLabel(option: FormSelectOption): string {
    return typeof option === 'object' ? option.label : String(option);
  }

  public getOptionValue(option: FormSelectOption): FormSelectOptionValue {
    return typeof option === 'object' ? option.value : option;
  }

  public isOptionDisabled(option: FormSelectOption): boolean {
    return typeof option === 'object' && !!option.disabled;
  }

  public isOptionHidden(option: FormSelectOption): boolean {
    return typeof option === 'object' && !!option.hidden;
  }
}
