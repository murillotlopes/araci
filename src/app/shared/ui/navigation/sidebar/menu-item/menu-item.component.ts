
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../navigation-item';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() isCollapsed!: boolean
  @Input() parentId!: string
  @Input({ required: true }) item!: NavigationItem;
  @Input() isHovered!: boolean
  @Input() childrenIdList!: string[]

  childId: string = crypto.randomUUID()

  ngOnInit() {
    this.childrenIdList.push(this.parentId + this.childId)
  }

}
