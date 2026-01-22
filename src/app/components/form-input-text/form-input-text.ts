import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RxFormControl, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-form-input-text',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule],
  templateUrl: './form-input-text.html',
  styleUrl: './form-input-text.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormInputText),
    multi: true
  }]
})
export class FormInputText {
  @Input() formControlName!: string
  @Input() placeholder!: string
  @Input() formGroup!: FormGroup
  @Input() label!: string

  public value: string = '';

  public onChange = (value: string) => { };
  public onTouched = () => { };

  public writeValue(value: string): void {
    this.value = value || ''; // Atualiza o valor do componente
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn; // Registra a função de mudança
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn; // Registra a função de toque
  }

  public getFormError(erro: any) {
    let erros = Object.values(erro.errors as RxFormControl)
    return erros[0]?.message ? erros[0]?.message : 'ERRO'
  }

  // Atualiza o valor sempre que o campo muda
  public onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value); // Dispara a mudança de valor
  }

}
