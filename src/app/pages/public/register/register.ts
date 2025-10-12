import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { InputPassword } from '../../../components/input-password/input-password';
import { InputText } from '../../../components/input-text/input-text';
import { FormResource } from '../../shared/form-resource';
import { RegisterService } from './services/register';

@Component({
  selector: 'app-register',
  imports: [InputText, InputPassword, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register extends FormResource {

  constructor(
    registerService: RegisterService
  ) {
    super(registerService)
    this.setMethodSubmitForm('register')
  }

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

  protected override afterSubmitForm(): void { }

}
