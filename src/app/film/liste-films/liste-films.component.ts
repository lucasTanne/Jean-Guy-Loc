import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem, FilmToList } from 'src/types/film-item';
import { Note, Notes } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { PrinterService } from '../services/printer.service';
import { StarsService } from '../services/stars.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {
  public listeFilms: FilmToList[] = []
  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private starsService: StarsService, private printerService: PrinterService) {
    this.printMenuService.setPrintMenu(true)
    this.getFilmList()
  }

  ngOnInit(): void {
  }

  getFilmList(){
    this.fetchFilmService.getListFilmsWithAverage().then((res: FilmToList[]) => {
      res.forEach((film: FilmToList) => {
        film.moyenne = Math.round(film.moyenne)
        if(film.synopsis != ""){
          film.synopsis = this.printerService.formatSynopsis(film.synopsis)
        }else{
          film.synopsis = "Aucun résumé"
        }
      })
      this.listeFilms = res
    }).catch((e) => {
      console.log("catch component")
      console.log(e)
    })
  }
}

