import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  @Input() disabled: boolean = false

  comeback() {
    history.back()
  }

}
