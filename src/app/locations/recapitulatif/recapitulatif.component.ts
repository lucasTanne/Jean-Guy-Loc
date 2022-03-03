import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FetchFilmService } from 'src/app/film/services/fetch-film.service';
import { StarsService } from 'src/app/film/services/stars.service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { NewLocation, NewLocationStreaming } from 'src/types/disponibilites';
import { FilmItem } from 'src/types/film-item';
import { Note } from 'src/types/note';
import { FetchDisponibilitesService } from '../services/fetch-disponibilites.service';

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
  public locationPayload: NewLocation = {
    dateDeLocation: new Date(1, 1, 1970),
    duree: 0,
    idFilm: -1,
    idUtilisateur: -1
  }
  public dateFin: string = ""
  public idFilm: string | null = "-1"
  public nbStarGold: number = 0
  public nbStarBlack: number = 5
  public errorMessage: string = ""
  public cannotLocated: boolean = false
  public printSuccess: boolean = false
  public messageSuccess: string = ""
  public timeLeft: number = 3

  constructor(private printMenuService: PrintMenuService, private activatedRoute: ActivatedRoute, private fetchFilmService: FetchFilmService, private cookieService: CookieService, private disponibiliteService: FetchDisponibilitesService, private router: Router, private starsService: StarsService) { 
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('idFilm')
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.fetchFilmService.getFilmNotes(this.film.idFilm).then((notes: Note[]) => {
            this.film.notes = notes
            let starsNumber: [number, number] = this.starsService.starsNumberFromArray(this.film.notes)
            this.nbStarBlack = starsNumber[0]
            this.nbStarGold = starsNumber[1]
          })
        })
      }
    })
    let payload: string = this.cookieService.get('locationPayload')
    if(payload != ""){
      this.locationPayload = JSON.parse(payload)
      let date: Date = new Date(this.locationPayload.dateDeLocation)
      date.setDate(date.getDate() + this.locationPayload.duree)
      let m: number = date.getMonth() + 1
      let month: string = m.toString().length === 2 ? m.toString() : "0" + m
      this.dateFin = date.getFullYear() + "-" + month + "-" + date.getDate()
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

  public createLocation(): void{
    console.log(this.locationPayload.dateDeLocation)
    this.disponibiliteService.createPhysicalLocation(this.locationPayload).then((res) => {
      this.messageSuccess = "La location à bien été enregistrer. Retour au menu dans " + this.timeLeft + " secondes."
      this.printSuccess = true
      setTimeout(() => {
        this.router.navigate(['films'])
      }, this.timeLeft * 1000)
    }).catch((e) => {
      this.errorMessage = "An error was occured when creating the location, retry later..."
      this.cannotLocated = true
    })
  }

  ngOnInit(): void {
  }

}
