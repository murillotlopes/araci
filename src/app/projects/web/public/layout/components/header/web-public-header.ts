import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-public',
  imports: [RouterLink],
  templateUrl: './web-public-header.html',
  styleUrl: './web-public-header.scss'
})
export class WebPublicHeader {
  theme: 'light' | 'dark' = 'light';

  constructor() {
    // aplica tema salvo ou default
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme = saved || 'light';
    document.body.dataset['theme'] = this.theme;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.dataset['theme'] = this.theme;
    localStorage.setItem('theme', this.theme);
  }
}
