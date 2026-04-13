import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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

  constructor(
    private renderer: Renderer2
  ) { }

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
