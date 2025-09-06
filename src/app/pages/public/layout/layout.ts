import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterPublic } from './components/footer/footer';
import { HeaderPublic } from './components/header/header';

@Component({
  selector: 'app-layout-public',
  imports: [RouterOutlet, FooterPublic, HeaderPublic],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutPublic {

}
