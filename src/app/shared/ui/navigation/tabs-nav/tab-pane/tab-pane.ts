import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-pane',
  imports: [],
  templateUrl: './tab-pane.html',
  styleUrl: './tab-pane.scss',
})
export class TabPane {

  @Input() activeId!: string
  @Input() label!: string
  visible = false
}
