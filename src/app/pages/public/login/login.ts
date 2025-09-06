import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      console.log('Login com:', email, password);
      // 👉 Aqui depois você chama seu serviço de autenticação
      // this.authService.login(email, password).subscribe(...)
      this.router.navigate(['/']);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
