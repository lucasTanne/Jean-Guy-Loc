import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TypeFilm } from 'src/types/film-item';
import { FetchGestionFilmService } from './service/fetch-gestion-film.service';

@Component({
  selector: 'app-gestion-film',
  templateUrl: './gestion-film.component.html',
  styleUrls: ['./gestion-film.component.css']
})
export class GestionFilmComponent implements OnInit {


  public typeFilm: TypeFilm[] = []; 

  constructor(private fetchGestionFilm : FetchGestionFilmService,private cookieService: CookieService) {
    
    this.fetchGestionFilm.getType().then((res: TypeFilm[]) => {
      this.typeFilm = res
    })


   }

  ngOnInit(): void {
  }


  sendCreateFilm(Titre : string, Type : string, duree :number, Image: string, Bande : string, Date : Date, Synopsis: string){

  }


}
