import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';
import { NavigationItem } from '../../../../shared/ui/navigation/navigation-item';
import { WEB_NAVIGATION } from '../../private/navigation/web-navigation.config';

export const webPrivateGuard: CanActivateFn = (_route, state) => {
  const session = inject(WebSessionService);
  const router = inject(Router);

  return session.restore().pipe(map((isAuthenticated) => {
    if (!isAuthenticated) return router.parseUrl('/login');
    if (state.url === '/dashboard') return true;

    const item = flattenNavigation(WEB_NAVIGATION).find(({ link }) => link === state.url);

    if (item && item.permission !== 0) return true;

    session.clear();
    return router.parseUrl('/login');
  }));
};

function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [item, ...flattenNavigation(item.menu ?? [])]);
}
