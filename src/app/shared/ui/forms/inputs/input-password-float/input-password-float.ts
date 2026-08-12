import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RxFormControl, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-input-password-float',
  imports: [RxReactiveFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-password-float.html',
  styleUrl: './input-password-float.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordFloat),
    multi: true
  }]
})
export class InputPasswordFloat {
  @Input() formControlName!: string
  @Input() placeholder!: string
  @Input() formGroup!: FormGroup
  @Input() label!: string

  public inputFocused: boolean = false;
  public isPasswordVisible: boolean = false
  public value: string = '';

  public onChange = (value: string) => { };
  public onTouched = () => { };

  public onFocus() {
    this.inputFocused = true;
    // this.onTouched()
  }

  public onBlur() {
    this.inputFocused = false;
    // this.onTouched()
  }

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

  public verifyActiveInput(formControl: any) {

    if (formControl.value || this.inputFocused) return true

    return false

  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;

    if (this.isPasswordVisible) {
      setTimeout(() => {
        this.isPasswordVisible = false
      }, 5000);
    }
  }

  // Atualiza o valor sempre que o campo muda
  public onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value); // Dispara a mudança de valor
  }
}
