import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';
import { WebAuthApi } from '../data-access/web-auth.api';
import { WebSignInInput } from '../data-access/web-auth.dto';

@Injectable({ providedIn: 'root' })
export class WebAuthFacade {
  private readonly api = inject(WebAuthApi);
  private readonly router = inject(Router);
  private readonly session = inject(WebSessionService);
  private readonly toastr = inject(ToastrService);

  signIn(input: WebSignInInput): void {
    this.api.signIn(input).subscribe({
      next: (session) => {
        this.session.save(session);

        if (this.session.requirement?.required === 'MFA') {
          this.toastr.info('A verificação em duas etapas será necessária para concluir o acesso.');
          return;
        }

        if (this.session.requirement?.required === 'NOrganizations') {
          this.toastr.info('Será necessário selecionar ou criar uma organização para concluir o acesso.');
          return;
        }

        void this.router.navigate(['/dashboard']);
        this.toastr.success('Seja bem vindo!');
      },
      error: () => undefined,
    });
  }

  logout(): void {
    this.session.clear();
    void this.router.navigate(['/login']);
  }
}
