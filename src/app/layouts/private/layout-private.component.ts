import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationItem } from '../../shared/ui/navigation/navigation-item';
import { SidebarComponent } from '../../shared/ui/navigation/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-layout-private',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout-private.component.html',
  styleUrl: './layout-private.component.scss'
})
export class LayoutPrivate {
  isCollapsed = false;
  isHovered = false;
  childrenIdList: string[] = []
  menu: NavigationItem[] = []

  constructor(
    private renderer: Renderer2,
    private authService: AuthService
  ) {
    this.menu = this.getMenu()
  }

  private getMenu(): NavigationItem[] {
    const storedMenu = sessionStorage.getItem('@pin_menu')

    if (!storedMenu) {
      this.authService.logout()
      return []
    }

    const parsedMenu: unknown = JSON.parse(storedMenu)

    if (!Array.isArray(parsedMenu)) {
      this.authService.logout()
      return []
    }

    return parsedMenu as NavigationItem[]
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
