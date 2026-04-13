import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../../services/auth/auth.service';
import { BackButton } from '../../../ui/buttons/back-button/back-button';
import { ClearButton } from '../../../ui/buttons/clear-button/clear-button';
import { DefaultButton } from '../../../ui/buttons/default-button/default-button';
import { SaveButton } from '../../../ui/buttons/save-button/save-button';
import { FormGroupComponent } from '../../../ui/forms/form-group/form-group';
import { FormInputText } from '../../../ui/forms/inputs/form-input-text/form-input-text';
import { FormRadioButton } from '../../../ui/forms/radios/form-radio-button/form-radio-button';
import { TabPane } from '../../../ui/navigation/tabs-nav/tab-pane/tab-pane';
import { TabsNav } from '../../../ui/navigation/tabs-nav/tabs-nav';
import { FormResource } from '../../shared/form-resource';

@Component({
  selector: 'app-dashboard',
  imports: [TabsNav, TabPane, ReactiveFormsModule, FormInputText, SaveButton, BackButton, ClearButton, DefaultButton, FormRadioButton, FormGroupComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard extends FormResource {

  constructor(
    authService: AuthService
  ) {
    super(authService)

  }

  protected override createFormFields(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      phone: [null, RxwebValidators.required({ message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nemo voluptatem iure molestiae necessitatibus, qui animi? Ut, ea eius? Tempore doloribus quibusdam ut at consequatur amet officia sit, deleniti suscipit!' })],
      who_is_your_self: [null, [RxwebValidators.required({ message: 'Campo obrigatório' }), RxwebValidators.email({ message: 'E-mail inválido' })]],
      who_is_you: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
      raradio: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
    })
  }
  protected override beforeSubmitForm(): void { }

  testCrazy() {
    alert('Olha que loucura')
  }

}
