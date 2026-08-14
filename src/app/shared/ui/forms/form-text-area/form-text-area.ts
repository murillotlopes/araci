import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormError } from '../form-error/form-error';

export type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical';

@Component({
  selector: 'app-form-text-area',
  imports: [ReactiveFormsModule, FormError],
  templateUrl: './form-text-area.html',
  styleUrl: './form-text-area.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextArea),
      multi: true,
    },
  ],
})
export class FormTextArea implements ControlValueAccessor {
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input() resize: TextAreaResize = 'vertical';

  value = '';
  controlDisabled = false;

  public onChange = (_value: string) => { };
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

  public writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
  }

  public updateValue(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
  }
}
