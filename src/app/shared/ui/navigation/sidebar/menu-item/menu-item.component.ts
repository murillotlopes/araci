
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../navigation-item';

@Component({
  selector: 'app-menu-item',
  host: {
    role: 'listitem',
  },
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit, OnChanges {
  private readonly router = inject(Router)

  @Input() isCollapsed!: boolean
  @Input({ required: true }) item!: NavigationItem;
  @Input() isHovered!: boolean
  @Input() isExpanded = false
  @Input() level = 0
  @Output() expandedChange = new EventEmitter<boolean>()

  readonly submenuId = `sidebar-submenu-${crypto.randomUUID()}`
  expandedChild: NavigationItem | null = null

  get hasChildren(): boolean {
    return !!this.item.menu?.length
  }

  get isCompact(): boolean {
    return this.isCollapsed && !this.isHovered
  }

  get isActiveBranch(): boolean {
    return this.matchesCurrentRoute(this.item)
  }

  ngOnInit(): void {
    this.expandedChild = this.item.menu?.find((child) => this.matchesCurrentRoute(child)) ?? null
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isExpanded']?.currentValue === false && !changes['isExpanded'].firstChange) {
      this.expandedChild = null
    }
  }

  toggleSubmenu(): void {
    this.expandedChange.emit(!this.isExpanded)
  }

  setExpandedChild(item: NavigationItem, isExpanded: boolean): void {
    this.expandedChild = isExpanded ? item : this.expandedChild === item ? null : this.expandedChild
  }

  private matchesCurrentRoute(item: NavigationItem): boolean {
    const matchesItem = !!item.link &&
      (this.router.url === item.link || this.router.url.startsWith(`${item.link}/`))

    return matchesItem || !!item.menu?.some((child) => this.matchesCurrentRoute(child))
  }
}
