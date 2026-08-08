import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  imports: [ReactiveFormsModule],
  templateUrl: './form-group.html',
  styleUrl: './form-group.scss',
})
export class FormGroupComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() autocomplete: 'on' | 'off' = 'off';
  @Input() showDivider = true;
  @Input() showHeader = false;
  @Output() formSubmit = new EventEmitter<SubmitEvent>();

  get shouldShowHeader(): boolean {
    return this.showHeader || !!this.title || !!this.subtitle;
  }

  onSubmit(event: SubmitEvent) {
    this.formSubmit.emit(event);
  }
}
