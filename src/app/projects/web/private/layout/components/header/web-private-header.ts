import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WebAuthFacade } from '../../../../auth/application/web-auth.facade';

interface OrganizationSummary {
  name: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './web-private-header.html',
  styleUrl: './web-private-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPrivateHeader {
  private readonly authFacade = inject(WebAuthFacade);

  protected readonly organization: OrganizationSummary = {
    name: 'Organização Pindorama',
    description: 'Ambiente de demonstração',
  };
  protected readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme.set(saved || 'light');
    document.body.dataset['theme'] = this.theme();
  }

  protected logout(): void {
    this.authFacade.logout();
  }

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    document.body.dataset['theme'] = this.theme();
    localStorage.setItem('theme', this.theme());
  }
}
