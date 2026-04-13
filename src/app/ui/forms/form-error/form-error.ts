import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [ReactiveFormsModule],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
})
export class FormError {

  @Input({ required: true }) control!: AbstractControl | null;

  shouldShowError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  private getRxWebErrorMessage(errors: ValidationErrors): string | null {
    const customError = Object
      .values(errors)
      .find((error) => !!error && typeof error === 'object' && 'message' in error);

    const message = (customError as { message?: unknown } | undefined)?.message;
    return typeof message === 'string' && message.trim() ? message : null;
  }

  get errorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errors = this.control.errors;

    const rxWebMessage = this.getRxWebErrorMessage(errors);
    if (rxWebMessage) return rxWebMessage;

    return 'Campo inválido.';
  }

}
