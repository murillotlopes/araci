import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { InputPassword } from '../../../components/input-password/input-password';
import { InputText } from '../../../components/input-text/input-text';
import { AuthService } from '../../../services/auth/auth.service';
import { FormResource } from '../../shared/form-resource';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputText, InputPassword],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login extends FormResource {

  constructor(
    authService: AuthService
  ) {
    super(authService)
    this.setMethodSubmitForm('login')
  }

  protected override createFormFields(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      password: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
    })
  }

  protected override beforeSubmitForm(): void { }

  protected override afterSubmitForm(): void { }
}
