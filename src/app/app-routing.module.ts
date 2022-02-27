import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CommentaireUtilisateurComponent } from './commentaire-utilisateur/commentaire-utilisateur.component';
import { ContactComponent } from './contact/contact/contact.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { VisuFilmComponent } from './visu-film/visu-film.component';
// import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'compte', loadChildren: () => import('src/app/compte/compte.module').then((m) => m.CompteModule)},
  { path: 'films', loadChildren: () => import('src/app/film/film.module').then((m) => m.FilmModule)},
  { path: 'contact', component: ContactComponent},
  { path: 'commentaire/:idUser', component: CommentaireUtilisateurComponent},
  { path: 'profil', component: UtilisateurComponent, canActivate: [ AuthGuard ]},
  { path: '', loadChildren: () => import('src/app/accueil/accueil.module').then((m) => m.AccueilModule)},
  { path: 'location/:idFilm', loadChildren: () => import('src/app/locations/locations.module').then((m) => m.LocationsModule), canActivate: [ AuthGuard ]},
  { path: 'streaming', component: VisuFilmComponent},
  { path : 'admin', loadChildren: () => import('src/app/admin/admin.module').then((m) => m.AdminModule) }
  //{ path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
