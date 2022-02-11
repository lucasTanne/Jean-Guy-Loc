import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact/contact.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
// import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: 'compte', pathMatch: 'full'},
  { path: 'compte', loadChildren: () => import('src/app/compte/compte.module').then((m) => m.CompteModule)},
  { path: 'films', loadChildren: () => import('src/app/film/film.module').then((m) => m.FilmModule)},
  { path: 'contact', component: ContactComponent},
  { path: 'profil', component: UtilisateurComponent},
  { path: 'accueil', loadChildren: () => import('src/app/accueil/accueil.module').then((m) => m.AccueilModule)},
  { path: 'location/:idFilm', loadChildren: () => import('src/app/locations/locations.module').then((m) => m.LocationsModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
