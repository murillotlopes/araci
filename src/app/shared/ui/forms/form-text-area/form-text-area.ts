import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../form-error/form-error';

export type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical';

@Component({
  selector: 'app-form-text-area',
  imports: [ReactiveFormsModule, FormError],
  templateUrl: './form-text-area.html',
  styleUrl: './form-text-area.scss',
})
export class FormTextArea {
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() resize: TextAreaResize = 'vertical';

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.formControlName) ?? null;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }
}
