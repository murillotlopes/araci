import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-button',
  imports: [],
  templateUrl: './save-button.html',
  styleUrl: './save-button.scss',
})
export class SaveButton {

  @Input() formGroup!: FormGroup

}
