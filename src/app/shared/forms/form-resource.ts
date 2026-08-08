import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseService } from '../../services/shared/base.service';

@Directive()
export abstract class FormResource {

  public formGroup!: FormGroup
  protected formBuilder: RxFormBuilder = new RxFormBuilder()
  private methodSubmitForm: string = 'submitForm'

  constructor(
    protected service: BaseService
  ) {
    this.createFormFields()
    this.setMethodSubmitForm()
  }

  protected abstract createFormFields(): void

  protected abstract beforeSubmitForm(): void

  protected afterSubmitForm(): void { }

  protected setMethodSubmitForm(method?: string): void {
    if (method) this.methodSubmitForm = method
  }

  private getMethodSubmitForm() {
    return this.methodSubmitForm
  }

  public async submitForm(event: Event) {
    const method = this.getMethodSubmitForm() as string

    this.beforeSubmitForm()
    this.service[method](this.formGroup.value)
    this.afterSubmitForm()
  }

  clearForm() {
    this.createFormFields()
  }

}
