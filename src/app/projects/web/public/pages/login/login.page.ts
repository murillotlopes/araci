import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormResource } from '../../../../../shared/forms/form-resource';
import { InputPassword } from '../../../../../shared/ui/forms/inputs/input-password/input-password';
import { InputText } from '../../../../../shared/ui/forms/inputs/input-text/input-text';
import { WebAuthFacade } from '../../../auth/application/web-auth.facade';
import { WebSignInInput } from '../../../auth/data-access/web-auth.dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputText, InputPassword],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage extends FormResource<WebSignInInput> {
  private readonly authFacade = inject(WebAuthFacade)

  protected override createFormFields(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      password: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
    })
  }

  protected override beforeSubmitForm(): void { }

  protected override submitFormValue(value: WebSignInInput): void {
    this.authFacade.signIn(value)
  }

  protected override afterSubmitForm(): void { }
}
