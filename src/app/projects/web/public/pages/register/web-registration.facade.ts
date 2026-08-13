import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebRegistrationApi } from './web-registration.api';
import { WebRegistrationInput } from './web-registration.dto';

@Injectable({ providedIn: 'root' })
export class WebRegistrationFacade {
  private readonly api = inject(WebRegistrationApi);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  register(input: WebRegistrationInput): void {
    this.api.register(input).subscribe({
      next: () => {
        void this.router.navigate(['/login']);
        this.toastr.success('Cadastro realizado com sucesso.\nFaça login!');
      },
      error: () => undefined,
    });
  }
}
