import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormResource } from '../../../../../shared/forms/form-resource';
import { InputPassword } from '../../../../../shared/ui/forms/inputs/input-password/input-password';
import { InputText } from '../../../../../shared/ui/forms/inputs/input-text/input-text';
import { WebRegistrationInput } from './web-registration.dto';
import { WebRegistrationFacade } from './web-registration.facade';

interface RegistrationFormValue extends WebRegistrationInput {
  confirm_password: string;
}

@Component({
  selector: 'app-register',
  imports: [InputText, InputPassword, ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss'
})
export class RegisterPage extends FormResource<RegistrationFormValue> {
  private readonly registrationFacade = inject(WebRegistrationFacade)

  protected override createFormFields(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      password: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.pattern({
        expression: {
          strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Regra de força
        },
        message: 'Mínimo 8 caracteres | 1 letra maiúscula | 1 letra minúscula | 1 número | 1 caractere especial'
      })]],
      confirm_password: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.compare({ fieldName: 'password', message: 'Senha informada não confere' })]]
    })
  }

  protected override beforeSubmitForm(): void { }

  protected override submitFormValue({ email, password }: RegistrationFormValue): void {
    this.registrationFacade.register({ email, password })
  }

  protected override afterSubmitForm(): void { }

}
