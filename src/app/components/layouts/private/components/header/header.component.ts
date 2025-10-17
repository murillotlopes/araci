import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private authService: AuthService
  ) { }

  public logout() {
    this.authService.logout()
  }

}
