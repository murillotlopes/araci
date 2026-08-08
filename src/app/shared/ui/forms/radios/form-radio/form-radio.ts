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
import { FormError } from '../../form-error/form-error';

export type FormRadioValue = string | number | boolean | null;

@Component({
  selector: 'app-form-radio',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-radio.html',
  styleUrl: './form-radio.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadio),
      multi: true,
    },
  ],
})
export class FormRadio implements ControlValueAccessor {
  @Input() formControlName = '';
  @Input() formGroup!: FormGroup;
  @Input() label = '';
  @Input() value: FormRadioValue = null;
  @Input() name = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showError = false;

  selectedValue: FormRadioValue = null;
  controlDisabled = false;
  inputId = 'form_radio_' + Math.random().toString(36).substring(2, 9);

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  get isChecked(): boolean {
    return Object.is(this.selectedValue, this.value);
  }

  get isDisabled(): boolean {
    return this.disabled || this.controlDisabled;
  }

  get radioName(): string {
    return this.name || this.formControlName || this.inputId;
  }

  public onChange = (_value: FormRadioValue) => {};
  public onTouched = () => {};

  public writeValue(value: FormRadioValue): void {
    this.selectedValue = value;
  }

  public registerOnChange(fn: (value: FormRadioValue) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
  }

  public selectRadio(): void {
    if (this.isDisabled) {
      return;
    }

    this.selectedValue = this.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
