import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';

export const CompteRouteList: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent }
]

@NgModule({
  declarations: [
    InscriptionComponent,
    ConnexionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CompteRouteList)
  ]
})
export class CompteModule { }
