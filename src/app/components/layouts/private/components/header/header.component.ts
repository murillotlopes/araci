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
  public theme: 'light' | 'dark' = 'light';

  constructor(
    private authService: AuthService
  ) {
    // aplica tema salvo ou default
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
