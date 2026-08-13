import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  imports: [],
  templateUrl: './clear-button.html',
  styleUrl: './clear-button.scss',
})
export class ClearButton {

  @Input() disabled: boolean = false
  @Output() clearForm = new EventEmitter<void>();

  clearFormActuator() {
    this.clearForm.emit()
  }
}
