import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DefaultButton } from '../../../../../shared/ui/buttons/default-button/default-button';
import { InputPasswordFloat } from '../../../../../shared/ui/forms/inputs/input-password-float/input-password-float';
import { InputTextFloat } from '../../../../../shared/ui/forms/inputs/input-text-float/input-text-float';
import { WebRegistrationInput } from './web-registration.dto';
import { WebRegistrationFacade } from './web-registration.facade';

@Component({
  selector: 'app-register',
  imports: [InputTextFloat, InputPasswordFloat, ReactiveFormsModule, RouterLink, DefaultButton],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss'
})
export class RegisterPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly registrationFacade = inject(WebRegistrationFacade);

  readonly formGroup = this.formBuilder.nonNullable.group({
    primaryName: ['', [
      RxwebValidators.required({ message: 'Informe seu nome completo' }),
      RxwebValidators.minLength({ value: 3, message: 'Mínimo 3 caracteres' }),
    ]],
    email: ['', [
      RxwebValidators.required({ message: 'E-mail obrigatório' }),
      RxwebValidators.email({ message: 'E-mail inválido' }),
    ]],
    password: ['', [
      RxwebValidators.required({ message: 'Escolha uma senha' }),
      RxwebValidators.pattern({
        expression: { strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/ },
        message: 'Mínimo 8 caracteres | 1 letra maiúscula | 1 letra minúscula | 1 número | 1 caractere especial',
      }),
    ]],
    confirmPassword: ['', [
      RxwebValidators.required({ message: 'Repita a senha informada' }),
      RxwebValidators.compare({ fieldName: 'password', message: 'Senha informada não confere' }),
    ]],
  });

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const { primaryName, email, password } = this.formGroup.getRawValue();
    const input: WebRegistrationInput = { primaryName, email, password };

    this.registrationFacade.register(input);
  }

}
