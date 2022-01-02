import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisponibilitesComponent } from './disponibilites/disponibilites.component';
import { RouterModule, Routes } from '@angular/router';

export const FilmsRouteList: Routes = [
  { path: '', component: DisponibilitesComponent }
]

@NgModule({
  declarations: [
    DisponibilitesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FilmsRouteList)
  ]
})
export class LocationsModule { }
