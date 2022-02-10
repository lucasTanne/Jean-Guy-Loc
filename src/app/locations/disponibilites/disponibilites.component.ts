import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FetchFilmService } from 'src/app/film/services/fetch-film.service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { Disponibilite, NewLocation } from 'src/types/disponibilites';
import { FilmItem } from 'src/types/film-item';
import { FetchDisponibilitesService } from '../services/fetch-disponibilites.service';

@Component({
  selector: 'app-disponibilites',
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.css']
})
export class DisponibilitesComponent {
  private idFilm: string | null = "-1"
  public nomFilm: string = "No film found"
  public lesDispo: Disponibilite[] = [{
    start: new Date(1970, 1, 1),
    end: new Date(1970, 1, 1),
    dispo: false
  }]
  public alreadyReserved: boolean = false
  public errorMessage: string = "Error: This film is already reserved at this date, choose another date."

  constructor(private printMenuService: PrintMenuService, private activatedRoute: ActivatedRoute, private fetchFilmService: FetchFilmService, private fetchDisponibiliteService: FetchDisponibilitesService, private cookieService: CookieService, private router: Router) {
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('idFilm')
      if(this.idFilm != null) {
        this.fetchFilmService.getFilm(this.idFilm).then((film: FilmItem) => {
          this.nomFilm = film.titre
        })
        this.fetchDisponibiliteService.getDispoOfFilm(parseInt(this.idFilm)).then((res: Disponibilite[]) => {
          this.lesDispo = res
        })
      }
    })
  }

  public selectLocationDate(disponibilite: Disponibilite): void{
    if(!disponibilite.dispo){
      this.alreadyReserved = true
      return
    }
    this.alreadyReserved = false
    let idUtilisateur: string = this.cookieService.get('UserID')
    if(idUtilisateur === ""){
      // error message with link to connexion
    }
    let newLocation: NewLocation = {
      dateDeLocation: disponibilite.start,
      duree: 7,
      idFilm: parseInt(this.idFilm || "-1"),
      idUtilisateur: parseInt(idUtilisateur)
    }
    this.cookieService.set('locationPayload', JSON.stringify(newLocation))
    this.router.navigate(['recapitulatif/' + this.idFilm]);
  }
}
