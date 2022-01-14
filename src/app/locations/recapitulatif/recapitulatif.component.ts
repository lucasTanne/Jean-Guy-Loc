import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchFilmService } from 'src/app/film/services/fetch-film.service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';
import { Note } from 'src/types/note';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {
  public film: FilmItem = {
    idFilm: -1,
    idTypeFilm: -1,
    titre: "Aucun film",
    lienImage: "#",
    lienBandeAnnonce: "#",
    synopsis: "vide",
    duree: 0.0,
    dateSortie: new Date(1970, 1, 1),
    notes: [{
      idNote: -1,
      idFilm: -1,
      valeur: 0,
      idUtilisateur: -1
    }],
    categories: ["aucune"],
    realisateurs: ["aucun"],
    acteurs: ["aucun"]
  }
  private idFilm: string | null = "9"
  public nbStarGold: number = 0
  public nbStarBlack: number = 5

  constructor(private printMenuService: PrintMenuService, private activatedRoute: ActivatedRoute, private fetchFilmService: FetchFilmService) { 
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      // this.idFilm = param.get('id')
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.fetchFilmService.getFilmNotes(this.film.idFilm).then((notes: Note[]) => {
            this.film.notes = notes
            this.setStarNumber()
          })
        })
      }
    })
  }

  // Calculate number of gold and black stars using film.notes
  private setStarNumber(): void {
    let notes: Note[] = this.film.notes
    if(notes.length === undefined || notes.length === 0) {
      this.nbStarGold = 0
      this.nbStarBlack = 5
    } else if (notes.length === 1) {
      this.nbStarGold = notes[0].valeur
      this.nbStarBlack = 5 - notes[0].valeur
    } else {
      let moyenne: number = 0
      let nbNotes: number = 0
      notes.forEach((note: Note, i: number) => {
        nbNotes++
        moyenne += note.valeur
      })
      moyenne = Math.round(moyenne / nbNotes)
      this.nbStarGold = moyenne
      this.nbStarBlack = 5 - moyenne
    }
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

  ngOnInit(): void {
  }

}
