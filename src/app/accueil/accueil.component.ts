import { Component, OnInit } from '@angular/core';
import { FilmCaroussel, FilmItem } from 'src/types/film-item';
import { FetchFilmService } from '../film/services/fetch-film.service';
import { PrintMenuService } from '../services/print-menu.service';
import { CarouselComponent } from './carousel/carousel.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  public listeFilms: FilmCaroussel[] = []

  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private cookieService: CookieService) {
    this.printMenuService.setPrintMenu(true)
    this.fetchFilmService.getFilmsRecent().then((list: FilmCaroussel[]) => {
      this.listeFilms = list
    }).catch((e) => {
      this.listeFilms[0] = {
        idFilm: -1,
        titre: "Aucun film",
        lienImage: "assets\cpt.png"
      }
    })
    console.log(this.cookieService.get('UserID'))
  }

  ngOnInit(): void {
  }

}
