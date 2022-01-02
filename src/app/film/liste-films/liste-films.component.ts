import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';
import { Note, Notes } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {
  public listeFilms: FilmItem[] = []
  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService) {
    this.printMenuService.setPrintMenu(true)
    this.getFilmList()
  }

  ngOnInit(): void {
  }

  getFilmList(){
    this.fetchFilmService.getListFilms().then((res: FilmItem[]) => {
      this.listeFilms = res
      this.listeFilms.forEach((film) => {
        this.fetchFilmService.getFilmNotes(film.idFilm).then((notes) => {
          film.notes = notes
          console.log(film.notes)
        })
      })
    }).catch((e) => {
      console.log("catch component")
      console.log(e)
    })
  }

  getNbStarGold(notes: Note[]): number {
    console.log(notes)
    if(notes === undefined || notes.length === 0) {
      return 0
    } else if (notes.length === 1) {
      return notes[0].valeur
    } else {
      let moyenne: number = 0
      let nbNotes: number = 0
      notes.forEach((note: Note, i: number) => {
        nbNotes++
        moyenne += note.valeur
      })
      return Math.round(moyenne / nbNotes)
    }
  }
}

