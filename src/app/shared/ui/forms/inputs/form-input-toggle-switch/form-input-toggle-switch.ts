import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormError } from '../../form-error/form-error';

@Component({
  selector: 'app-form-input-toggle-switch',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-input-toggle-switch.html',
  styleUrl: './form-input-toggle-switch.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormInputToggleSwitch),
    multi: true
  }]
})
export class FormInputToggleSwitch implements ControlValueAccessor {
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() label = '';
  @Input() onLabel = '';
  @Input() offLabel = '';
  @Input() placeholder = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  value = false;
  controlDisabled = false;
  inputId = 'toggle_switch_' + Math.random().toString(36).substring(2, 9);

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  get isDisabled(): boolean {
    return this.disabled || this.controlDisabled;
  }

  get statusLabel(): string {
    return this.value ? this.onLabel : this.offLabel;
  }

  public onChange = (_value: boolean) => { };
  public onTouched = () => { };

  public writeValue(value: boolean): void {
    this.value = !!value;
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
  }

  public toggleValue(event: Event): void {
    if (this.isDisabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).checked;
    this.onChange(this.value);
    this.onTouched();
  }
}
