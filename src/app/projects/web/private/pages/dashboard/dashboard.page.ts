import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormResource } from '../../../../../shared/forms/form-resource';
import { BackButton } from '../../../../../shared/ui/buttons/back-button/back-button';
import { ClearButton } from '../../../../../shared/ui/buttons/clear-button/clear-button';
import { DefaultButton } from '../../../../../shared/ui/buttons/default-button/default-button';
import { SaveButton } from '../../../../../shared/ui/buttons/save-button/save-button';
import { FormCheckbox } from '../../../../../shared/ui/forms/form-checkbox/form-checkbox';
import { FormGroupComponent } from '../../../../../shared/ui/forms/form-group/form-group';
import { FormSelect } from '../../../../../shared/ui/forms/form-select/form-select';
import { FormTextArea } from '../../../../../shared/ui/forms/form-text-area/form-text-area';
import { FormInputFileList } from '../../../../../shared/ui/forms/inputs/form-input-file-list/form-input-file-list';
import { FormInputFile } from '../../../../../shared/ui/forms/inputs/form-input-file/form-input-file';
import { FormInputText } from '../../../../../shared/ui/forms/inputs/form-input-text/form-input-text';
import { FormInputToggleSwitch } from '../../../../../shared/ui/forms/inputs/form-input-toggle-switch/form-input-toggle-switch';
import { FormRadioButton } from '../../../../../shared/ui/forms/radios/form-radio-button/form-radio-button';
import { FormRadio } from '../../../../../shared/ui/forms/radios/form-radio/form-radio';
import { Pagination } from '../../../../../shared/ui/navigation/pagination/pagination';
import { TabPane } from '../../../../../shared/ui/navigation/tabs-nav/tab-pane/tab-pane';
import { TabsNav } from '../../../../../shared/ui/navigation/tabs-nav/tabs-nav';
import { SkeletonForm } from '../../../../../shared/ui/skeleton/skeleton-form/skeleton-form';
import { SkeletonList } from '../../../../../shared/ui/skeleton/skeleton-list/skeleton-list';

@Component({
  selector: 'app-dashboard',
  imports: [TabsNav, TabPane, ReactiveFormsModule, FormInputText, SaveButton, BackButton, ClearButton, DefaultButton, FormRadioButton, FormGroupComponent, FormSelect, FormInputToggleSwitch, FormRadio, FormCheckbox, FormTextArea, FormInputFileList, FormInputFile, SkeletonForm, SkeletonList, Pagination],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage extends FormResource {

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

  protected override submitFormValue(): void { }

  testCrazy() {
    alert('Olha que loucura')
  }

}
