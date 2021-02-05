import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if ( this.mustShowErrorMessage() )
      return this.getErrorMessage();
    else
      return null
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null {

    if (this.formControl.errors.required)
      return 'Campo Obrigátorio'

      else if (this.formControl.errors.email)
      return 'Formato de e-mail Inválido.'

    else if (this.formControl.errors.minlenght) {
      const requiredLenght = this.formControl.errors.minlenght.requiredLength;
      return `Campo deve ter no Mínimo ${requiredLenght} Caracteres`
    }
  }

}
