
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../navigation-item';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly router = inject(Router)

  @Input() isCollapsed!: boolean
  @Input() isHovered!: boolean

  @Input({ required: true })
  set menu(items: NavigationItem[]) {
    this.menuItems = items
    this.expandedItem = items.find((item) => this.matchesCurrentRoute(item)) ?? null
  }

  menuItems: NavigationItem[] = []
  expandedItem: NavigationItem | null = null

  setExpandedItem(item: NavigationItem, isExpanded: boolean): void {
    this.expandedItem = isExpanded ? item : this.expandedItem === item ? null : this.expandedItem
  }

  private matchesCurrentRoute(item: NavigationItem): boolean {
    const matchesItem = !!item.link &&
      (this.router.url === item.link || this.router.url.startsWith(`${item.link}/`))

    return matchesItem || !!item.menu?.some((child) => this.matchesCurrentRoute(child))
  }
}
