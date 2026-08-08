import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../../services/auth/auth.service';
import { BackButton } from '../../../ui/buttons/back-button/back-button';
import { ClearButton } from '../../../ui/buttons/clear-button/clear-button';
import { DefaultButton } from '../../../ui/buttons/default-button/default-button';
import { SaveButton } from '../../../ui/buttons/save-button/save-button';
import { FormCheckbox } from '../../../ui/forms/form-checkbox/form-checkbox';
import { FormGroupComponent } from '../../../ui/forms/form-group/form-group';
import { FormSelect } from '../../../ui/forms/form-select/form-select';
import { FormTextArea } from '../../../ui/forms/form-text-area/form-text-area';
import { FormInputFileList } from '../../../ui/forms/inputs/form-input-file-list/form-input-file-list';
import { FormInputFile } from '../../../ui/forms/inputs/form-input-file/form-input-file';
import { FormInputText } from '../../../ui/forms/inputs/form-input-text/form-input-text';
import { FormInputToggleSwitch } from '../../../ui/forms/inputs/form-input-toggle-switch/form-input-toggle-switch';
import { FormRadioButton } from '../../../ui/forms/radios/form-radio-button/form-radio-button';
import { FormRadio } from '../../../ui/forms/radios/form-radio/form-radio';
import { Pagination } from '../../../ui/navigation/pagination/pagination';
import { TabPane } from '../../../ui/navigation/tabs-nav/tab-pane/tab-pane';
import { TabsNav } from '../../../ui/navigation/tabs-nav/tabs-nav';
import { SkeletonForm } from '../../../ui/skeleton/skeleton-form/skeleton-form';
import { FormResource } from '../../shared/form-resource';
import { SkeletonList } from '../skeleton/skeleton-list/skeleton-list';

@Component({
  selector: 'app-dashboard',
  imports: [TabsNav, TabPane, ReactiveFormsModule, FormInputText, SaveButton, BackButton, ClearButton, DefaultButton, FormRadioButton, FormGroupComponent, FormSelect, FormInputToggleSwitch, FormRadio, FormCheckbox, FormTextArea, FormInputFileList, FormInputFile, SkeletonForm, SkeletonList, Pagination],
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
      favorite_option: [null, RxwebValidators.required({ message: 'Campo obrigatório' })],
      toggle: [false],
      toggle_b: [true],
      toggle_c: [null],
      radio: [null],
      checkbox: [null],
      textArea: [null],
      fileList: [null],
      documents: [null]
    })
  }
  protected override beforeSubmitForm(): void { }

  testCrazy() {
    alert('Olha que loucura')
  }

}
