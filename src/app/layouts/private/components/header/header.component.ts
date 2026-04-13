import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public theme: 'light' | 'dark' = 'light';

  constructor(
    private authService: AuthService
  ) {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme = saved || 'light';
    document.body.dataset['theme'] = this.theme;
  }

  public logout() {
    this.authService.logout()
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.dataset['theme'] = this.theme;
    localStorage.setItem('theme', this.theme);
  }

}
