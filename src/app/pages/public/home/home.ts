import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  theme: 'light' | 'dark' = 'light';

  // scroll suave no angular
  @HostListener('document:click', ['$event'])
  onNavClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(target.getAttribute('href')!);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
