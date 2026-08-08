import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';
import { NavigationItem } from '../../../../shared/ui/navigation/navigation-item';

export const webPrivateGuard: CanActivateFn = (_route, state) => {
  const session = inject(WebSessionService);
  const router = inject(Router);

  if (!session.isAuthenticated) return router.parseUrl('/login');
  if (state.url === '/dashboard') return true;

  const navigation = session.getNavigation<NavigationItem>();
  const item = navigation ? flattenNavigation(navigation).find(({ link }) => link === state.url) : null;

  if (item && item.permission !== 0) return true;

  session.clear();
  return router.parseUrl('/login');
};

function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [item, ...flattenNavigation(item.menu ?? [])]);
}
