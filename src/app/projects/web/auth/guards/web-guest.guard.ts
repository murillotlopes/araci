import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';

export const webGuestGuard: CanActivateFn = () => {
  const session = inject(WebSessionService);
  const router = inject(Router);

  return session.restore().pipe(
    map((isAuthenticated) => isAuthenticated ? router.parseUrl('/dashboard') : true),
  );
};
