import { Component, Renderer2 } from '@angular/core';
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
  isCollapsed = false;
  isHovered = false;
  childrenIdList: string[] = []
  menu: NavigationItem[] = []

  constructor(
    private renderer: Renderer2,
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

    if (this.isCollapsed && !this.isHovered) {
      this.childrenIdList.forEach(id => {

        this.addClassByAriaControls(id)
        this.addClassById(id)
      })

    }

  }

  addClassById(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      this.renderer.removeClass(element, 'show')
    }
  }

  addClassByAriaControls(ariaControls: string): void {
    const element = document.querySelector(`[aria-controls="${ariaControls}"]`);
    if (element) {
      this.renderer.addClass(element, 'collapsed');
      this.renderer.setAttribute(element, 'aria-expanded', 'false')
    }
  }

}
