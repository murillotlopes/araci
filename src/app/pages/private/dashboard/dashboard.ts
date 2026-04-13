import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BackButton } from '../../../components/buttons/back-button/back-button';
import { ClearButton } from '../../../components/buttons/clear-button/clear-button';
import { DefaultButton } from '../../../components/buttons/default-button/default-button';
import { FormGroupComponent } from '../../../components/form-group/form-group';
import { SaveButton } from '../../../components/buttons/save-button/save-button';
import { FormInputText } from '../../../components/form-input-text/form-input-text';
import { FormRadioButton } from '../../../components/radios/form-radio-button/form-radio-button';
import { TabPane } from '../../../components/tabs-nav/tab-pane/tab-pane';
import { TabsNav } from '../../../components/tabs-nav/tabs-nav';
import { AuthService } from '../../../services/auth/auth.service';
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
