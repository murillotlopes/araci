import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';

export const webGuestGuard: CanActivateFn = () => {
  const session = inject(WebSessionService);
  return session.isAuthenticated ? inject(Router).parseUrl('/dashboard') : true;
};
