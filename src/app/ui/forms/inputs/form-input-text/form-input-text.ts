import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormError } from '../../form-error/form-error';

@Component({
  selector: 'app-form-input-text',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, FormError],
  templateUrl: './form-input-text.html',
  styleUrl: './form-input-text.scss',
})
export class FormInputText {
  @Input({ required: true }) formControlName!: string;
  @Input() placeholder = '';
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) label!: string;

  public value: string = '';

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? this.formGroup?.get(this.formControlName) ?? null;
  }

  public onChange = (_value: string) => { };
  public onTouched = () => { };

  public writeValue(value: string): void {
    this.value = value || '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
