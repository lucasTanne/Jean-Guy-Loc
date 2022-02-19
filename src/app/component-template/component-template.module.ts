import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorTemplateComponent } from './error-template/error-template.component';
import { RouterModule, Routes } from '@angular/router';

export const FilmsRouteList: Routes = []

@NgModule({
  declarations: [
    ErrorTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FilmsRouteList),
  ],
  exports: [
    ErrorTemplateComponent
  ]
})
export class ComponentTemplateModule { }
