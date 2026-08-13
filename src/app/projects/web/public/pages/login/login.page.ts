import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DefaultButton } from '../../../../../shared/ui/buttons/default-button/default-button';
import { InputPasswordFloat } from '../../../../../shared/ui/forms/inputs/input-password-float/input-password-float';
import { InputTextFloat } from '../../../../../shared/ui/forms/inputs/input-text-float/input-text-float';
import { WebAuthFacade } from '../../../auth/application/web-auth.facade';
import { WebSignInInput } from '../../../auth/data-access/web-auth.dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, DefaultButton, InputTextFloat, InputPasswordFloat],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authFacade = inject(WebAuthFacade);

  readonly formGroup = this.formBuilder.nonNullable.group({
    email: ['', [
      RxwebValidators.required({ message: 'Informe seu e-mail' }),
      RxwebValidators.email({ message: 'E-mail inválido' }),
    ]],
    password: ['', [RxwebValidators.required({ message: 'Informe sua senha' })]],
  });

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const input: WebSignInInput = this.formGroup.getRawValue();
    this.authFacade.signIn(input);
  }
}
