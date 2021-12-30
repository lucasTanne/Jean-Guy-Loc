import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';
import { FetchFilmService } from '../services/fetch-film.service';


@Component({
  selector: 'app-vue-film',
  templateUrl: './vue-film.component.html',
  styleUrls: ['./vue-film.component.css']
})
export class VueFilmComponent implements OnInit {
  public film: FilmItem = {
    idFilm: -1,
    idTypeFilm: -1,
    titre: "Aucun film",
    lienImage: "#",
    lienBandeAnnonce: "#",
    synopsis: "vide",
    duree: 0.0,
    dateSortie: new Date(1970, 1, 1),
    notes: [0],
    categories: ["aucune"],
    realisateurs: ["aucun"],
    acteurs: ["aucun"]
  }
  private idFilm: string | null = ""
  public nbStarGold: number = 0
  public nbStarBlack: number = 5

  constructor(private printMenuService: PrintMenuService, private activatedRoute: ActivatedRoute, private fetchFilmService: FetchFilmService) {
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('id')
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.setStarNumber()
        })
      }
    })
  }

  // Returns a string that contains content of an array separated by virgule
  public getContentValue(list: string[]): string {
    if(list === undefined) {
      return "aucun"
    } else if (list.length == 0) {
      return "aucun"
    }

    let res: string = list[0]
    for(let i = 1; i < list.length; i++) {
      res += (", " + list[i])
    }
    return res
  }

  // Calculate number of gold and black stars using film.notes
  private setStarNumber(): void {
    let notes: number[] = this.film.notes
    if(notes.length === undefined || notes.length === 0) {
      this.nbStarGold = 0
      this.nbStarBlack = 5
    } else if (notes.length === 1) {
      this.nbStarGold = notes[0]
      this.nbStarBlack = 5 - notes[0]
    } else {
      let moyenne: number = 0
      let nbNotes: number = 0
      notes.forEach((note: number, i: number) => {
        nbNotes++
        moyenne += note
      })
      moyenne = Math.round(moyenne / nbNotes)
      this.nbStarGold = moyenne
      this.nbStarBlack = 5 - moyenne
    }
  }

  ngOnInit(): void {
  }

}
