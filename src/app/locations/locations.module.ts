import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisponibilitesComponent } from './disponibilites/disponibilites.component';
import { RouterModule, Routes } from '@angular/router';
import { RecapitulatifComponent } from './recapitulatif/recapitulatif.component';

export const FilmsRouteList: Routes = [
  { path: '', component: DisponibilitesComponent },
  { path: 'recapitulatif/:idFilm', component: RecapitulatifComponent }
]

@NgModule({
  declarations: [
    DisponibilitesComponent,
    RecapitulatifComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FilmsRouteList)
  ]
})
export class LocationsModule { }
