import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
})
export class FormSelect {
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) label!: string;
  @Input() options: FormSelectOption[] = [];
  @Input() placeholder = 'Selecione uma opção';
  @Input() showPlaceholder = true;
  @Input() disabled = false;

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
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
