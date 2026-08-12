import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationItem } from '../../../../shared/ui/navigation/navigation-item';
import { SidebarComponent } from '../../../../shared/ui/navigation/sidebar/sidebar.component';
import { WEB_NAVIGATION } from '../navigation/web-navigation.config';
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
  menu: NavigationItem[] = WEB_NAVIGATION;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  hoverSidebar(isHovered: boolean) {
    this.isHovered = isHovered;
  }

}
