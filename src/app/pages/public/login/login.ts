import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { InputPassword } from '../../../components/input-password/input-password';
import { InputText } from '../../../components/input-text/input-text';
import { LoginService } from './services/login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputText, InputPassword],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  formGroup!: FormGroup;
  protected formBuilder: RxFormBuilder = new RxFormBuilder()

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      password: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
    })
  }

  submitForm() {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => alert('Erro ao fazer login')
      })


      // const { email, password } = this.formGroup.value;
      // console.log('Login com:', email, password);
      // 👉 Aqui depois você chama seu serviço de autenticação
      // this.authService.login(email, password).subscribe(...)
      // this.router.navigate(['/']);
    } else {
      // this.formGroup.markAllAsTouched();
    }
  }
}
