import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { AgmCoreModule } from '@agm/core';

export const AccueilRouteList: Routes = [
  { path: '', component: AccueilComponent }
]

@NgModule({
  declarations: [
    AccueilComponent,
    CarouselComponent
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
