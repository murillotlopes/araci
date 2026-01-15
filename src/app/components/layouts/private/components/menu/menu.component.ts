
import { Component, Input } from '@angular/core';
import { MenuInterface } from '../../../../../interfaces/menu.interface';
import { AuthService } from '../../../../../services/auth/auth.service';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() isCollapsed!: boolean
  @Input() isHovered!: boolean
  @Input() childrenIdList!: string[]

  public accordionId = crypto.randomUUID()
  public menu!: MenuInterface[] | undefined

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.menu = this.getMenu()
  }

  private getMenu(): MenuInterface[] | undefined {

    const menu = sessionStorage.getItem('@pin_menu') as string

    if (!menu) this.authService.logout()

    const menuParse = JSON.parse(menu)

    if (!Array.isArray(menuParse)) this.authService.logout()

    return menuParse

  }

}


