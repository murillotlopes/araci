import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Directive()
export abstract class FormResource<TValue extends object = Record<string, unknown>> {

  public formGroup!: FormGroup
  protected formBuilder: RxFormBuilder = new RxFormBuilder()
  constructor() {
    this.createFormFields()
  }

  protected abstract createFormFields(): void

  protected abstract beforeSubmitForm(): void

  protected afterSubmitForm(): void { }

  protected abstract submitFormValue(value: TValue): void

  public submitForm(_event: Event): void {
    this.beforeSubmitForm()
    this.submitFormValue(this.formGroup.getRawValue() as TValue)
    this.afterSubmitForm()
  }

  clearForm() {
    this.createFormFields()
  }

}
