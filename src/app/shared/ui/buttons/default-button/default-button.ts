import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  imports: [],
  templateUrl: './default-button.html',
  styleUrl: './default-button.scss',
})
export class DefaultButton {
  @Input() type: 'button' | 'submit' | 'reset' = 'button'
  @Input() disabled: boolean = false
  @Output() externalFunction = new EventEmitter<void>();

  externalFunctionActuator() {
    this.externalFunction.emit()
  }
}
