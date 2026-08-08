import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormError } from '../../form-error/form-error';

@Component({
  selector: 'app-form-radio-button',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-radio-button.html',
  styleUrl: './form-radio-button.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormRadioButton),
    multi: true
  }]
})
export class FormRadioButton implements ControlValueAccessor {

  @Input({ required: true }) items: { value: string, label: string }[] = [];
  @Input() formControlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() label = '';
  @Input() name: string = 'radio_group_' + Math.random().toString(36).substring(2, 9);

  value: any = '';
  disabled = false;

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  public onChange = (value: string) => { };
  public onTouched = () => { };

  public writeValue(value: string): void {
    this.value = value || '';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectItem(val: string) {
    if (!this.disabled) {
      this.value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

}
