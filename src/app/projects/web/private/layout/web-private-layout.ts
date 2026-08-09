import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSessionService } from '../../../../core/auth/session/web-session.service';
import { NavigationItem } from '../../../../shared/ui/navigation/navigation-item';
import { SidebarComponent } from '../../../../shared/ui/navigation/sidebar/sidebar.component';
import { WebAuthFacade } from '../../auth/application/web-auth.facade';
import { WebPrivateHeader } from './components/header/web-private-header';

@Component({
  selector: 'app-layout-private',
  standalone: true,
  imports: [SidebarComponent, WebPrivateHeader, RouterOutlet],
  templateUrl: './web-private-layout.html',
  styleUrl: './web-private-layout.scss'
})
export class WebPrivateLayout {
  isCollapsed = typeof window === 'undefined' || !window.matchMedia('(min-width: 62rem)').matches;
  isHovered = false;
  menu: NavigationItem[] = []

  constructor(
    private authFacade: WebAuthFacade,
    private webSession: WebSessionService
  ) {
    this.menu = this.getMenu()
  }

  private getMenu(): NavigationItem[] {
    const navigation = this.webSession.getNavigation<NavigationItem>()

    if (!navigation) {
      this.authFacade.logout()
      return []
    }

    return navigation
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  hoverSidebar(isHovered: boolean) {
    this.isHovered = isHovered;
  }

}
