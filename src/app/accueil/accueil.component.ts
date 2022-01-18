import { Component, OnInit } from '@angular/core';
import { FilmItem } from 'src/types/film-item';
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
  public listeFilms: FilmItem[] = []

  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private cookieService: CookieService) {
    this.printMenuService.setPrintMenu(true)
    this.fetchFilmService.getListFilms().then((list: FilmItem[]) => {
      this.listeFilms = list
    }).catch((e) => {
      this.listeFilms[0] = {
        idFilm: -1,
        idTypeFilm: -1,
        titre: "Aucun film",
        lienImage: "assets\cpt.png",
        lienBandeAnnonce: "#",
        synopsis: "vide",
        duree: 0.0,
        dateSortie: new Date(1970, 1, 1),
        notes: [{
          idNote: -1,
          idFilm: -1,
          idUtilisateur: -1,
          valeur: 0
        }],
        categories: ["aucune"],
        realisateurs: ["aucun"],
        acteurs: ["aucun"]
      }
    })
    console.log(this.cookieService.get('UserID'))
  }

  ngOnInit(): void {
  }

}
