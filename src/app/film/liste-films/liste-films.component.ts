import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';
import { Note, Notes } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { StarsService } from '../services/stars.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {
  public listeFilms: FilmItem[] = []
  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private starsService: StarsService) {
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
    return this.starsService.starsNumberGoldFromArray(notes)
  }
}

