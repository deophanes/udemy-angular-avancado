import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastrModule,
    CalendarModule,
    IMaskModule,
    ProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastrModule,
    CalendarModule,
    IMaskModule,
    ProgressSpinnerModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent
  ]
})
export class SharedModule { }
