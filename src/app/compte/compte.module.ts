import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { PrintMenuService } from '../services/print-menu.service';
import { CompteService } from './services/compte.service';
import { HttpClientModule } from '@angular/common/http';

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
    RouterModule.forChild(CompteRouteList),
    HttpClientModule
  ],
  providers: [
    PrintMenuService,
    CompteService
  ]
})
export class CompteModule { }
