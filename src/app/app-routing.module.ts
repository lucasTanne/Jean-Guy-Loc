import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: 'compte', pathMatch: 'full'},
  { path: 'compte', loadChildren: () => import('src/app/compte/compte.module').then((m) => m.CompteModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
