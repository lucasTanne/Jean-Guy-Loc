import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';
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
      console.log(res[0].notes.length)
    }).catch((e) => {
      console.log("catch component")
      console.log(e)
    })
  }

}
function sizeof(notes: any): any {
  throw new Error('Function not implemented.');
}

