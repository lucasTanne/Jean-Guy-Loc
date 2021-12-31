import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';

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
    RouterModule.forChild(AccueilRouteList)
  ]
})
export class AccueilModule { }
