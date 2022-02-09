import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { AgmCoreModule } from '@agm/core';
import { CompteurComponent } from './compteur/compteur.component';

export const AccueilRouteList: Routes = [
  { path: '', component: AccueilComponent }
]

@NgModule({
  declarations: [
    AccueilComponent,
    CarouselComponent,
    CompteurComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AccueilRouteList),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6JbREG087uzwf71wppIHj9pZoQmd1hW4'
    })
  ]
})
export class AccueilModule { }
