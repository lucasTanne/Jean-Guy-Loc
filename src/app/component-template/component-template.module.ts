import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorTemplateComponent } from './error-template/error-template.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessTemplateComponent } from './success-template/success-template.component';

export const FilmsRouteList: Routes = []

@NgModule({
  declarations: [
    ErrorTemplateComponent,
    SuccessTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FilmsRouteList),
  ],
  exports: [
    ErrorTemplateComponent,
    SuccessTemplateComponent
  ]
})
export class ComponentTemplateModule { }
