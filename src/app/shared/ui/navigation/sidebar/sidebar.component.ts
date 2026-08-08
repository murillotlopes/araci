
import { Component, Input } from '@angular/core';
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
  @Input() isCollapsed!: boolean
  @Input() isHovered!: boolean
  @Input() childrenIdList!: string[]
  @Input({ required: true }) menu!: NavigationItem[]

  public accordionId = crypto.randomUUID()
}
