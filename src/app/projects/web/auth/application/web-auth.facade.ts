import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';
import { WEB_NAVIGATION } from '../../private/navigation/web-navigation.config';
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
        this.session.saveNavigation(WEB_NAVIGATION);
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
