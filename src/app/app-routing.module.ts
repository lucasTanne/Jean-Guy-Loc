import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: 'compte', pathMatch: 'full'},
  { path: 'compte', loadChildren: () => import('src/app/compte/compte.module').then((m) => m.CompteModule)},
  { path: 'films', loadChildren: () => import('src/app/film/film.module').then((m) => m.FilmModule)},
  // { path: 'acceuil', component: AccueilComponent}
  { path: 'accueil', loadChildren: () => import('src/app/accueil/accueil.module').then((m) => m.AccueilModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
