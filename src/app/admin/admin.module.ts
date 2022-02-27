import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { GestionFilmComponent } from './gestion-film/gestion-film.component';
import { RenduFilmComponent } from './rendu-film/rendu-film.component';
import { RouterModule, Routes } from '@angular/router';
import { ListeFilmAdminComponent } from './liste-film-admin/liste-film-admin.component';

export const CompteRouteList: Routes = [
  { path: '', component: AccueilAdminComponent, pathMatch: 'full'  },
  { path: 'gestion-film', component: GestionFilmComponent },
  { path: 'liste-film', component: ListeFilmAdminComponent },
  { path: 'rendufilm', component: RenduFilmComponent }
]

@NgModule({
  declarations: [
    AccueilAdminComponent,
    GestionFilmComponent,
    RenduFilmComponent,
    ListeFilmAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CompteRouteList),
  ]
})
export class AdminModule { }
