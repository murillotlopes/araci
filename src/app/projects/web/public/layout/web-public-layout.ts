import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebPublicFooter } from './components/footer/web-public-footer';
import { WebPublicHeader } from './components/header/web-public-header';

@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [RouterOutlet, WebPublicFooter, WebPublicHeader],
  templateUrl: './web-public-layout.html',
  styleUrl: './web-public-layout.scss'
})
export class WebPublicLayout {

}
