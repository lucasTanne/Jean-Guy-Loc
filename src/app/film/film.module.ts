import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { VueFilmComponent } from './vue-film/vue-film.component';
import { FilterGenreComponent } from './filter/filter-genre/filter-genre.component';
import { FilterNoteComponent } from './filter/filter-note/filter-note.component';
import { FilterDateComponent } from './filter/filter-date/filter-date.component';

export const FilmsRouteList: Routes = [
  { path: '', component: ListeFilmsComponent },
  { path: 'voirFilm/:id', component: VueFilmComponent },
]

@NgModule({
  declarations: [
    ListeFilmsComponent,
    FilterComponent,
    VueFilmComponent,
    FilterGenreComponent,
    FilterNoteComponent,
    FilterDateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FilmsRouteList)
  ]
})
export class FilmModule { }
