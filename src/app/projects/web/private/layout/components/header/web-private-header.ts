import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WebAuthFacade } from '../../../../auth/application/web-auth.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './web-private-header.html',
  styleUrl: './web-private-header.scss'
})
export class WebPrivateHeader {
  public theme: 'light' | 'dark' = 'light';

  constructor(
    private authFacade: WebAuthFacade
  ) {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme = saved || 'light';
    document.body.dataset['theme'] = this.theme;
  }

  public logout() {
    this.authFacade.logout()
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.dataset['theme'] = this.theme;
    localStorage.setItem('theme', this.theme);
  }

}
