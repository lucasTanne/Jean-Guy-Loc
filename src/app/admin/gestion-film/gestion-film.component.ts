import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Film, TypeFilm } from 'src/types/film-item';
import { symbolName, textSpanIntersectsWithPosition } from 'typescript';
import { FetchGestionFilmService } from './service/fetch-gestion-film.service';

@Component({
  selector: 'app-gestion-film',
  templateUrl: './gestion-film.component.html',
  styleUrls: ['./gestion-film.component.css']
})
export class GestionFilmComponent implements OnInit {


  public typeFilm: TypeFilm[] = []; 

  public cannotSend: boolean = false
  public cannotConnect: boolean = false
  public errorConnexion: boolean = false
  public errorMessage: string = ""
   

  constructor(private fetchGestionFilm : FetchGestionFilmService,private cookieService: CookieService) {
    
    this.fetchGestionFilm.getType().then((res: TypeFilm[]) => {
      this.typeFilm = res
    })


   }

  ngOnInit(): void {
  }


  sendCreateFilm(Titre : string, Type : string, duree: number, Image: string, Bande : string, dateSortie : string, Synopsis: string){
    const tabDate: string [] = dateSortie.split('-')
    console.log(tabDate)
    let res : Film = {
      idTypeFilm: -1,
      titre: '',
      lienImage: '',
      lienBandeAnnonce: '',
      synopsis: '',
      duree: 0,
      dateSortie: new Date(1970, 1, 1).toDateString()
    };
    if(Titre.trim() == "" || Type == "-1" || duree == -1 || Image.trim() == "" || Bande.trim() == "" || dateSortie.trim() == "" || Synopsis.trim() == ""){
      this.errorConnexion = false
      this.errorMessage = "Champ(s) vide"
      this.cannotSend= true
      return
    } else if (Synopsis.length > 2048 ){
      this.errorConnexion = false
      this.errorMessage = "Synopsis limité à 2048 caractères"
      this.cannotSend= true
      return
    } else if (isNaN(duree) ){
      this.errorConnexion = false
      this.errorMessage = "Durée doit être un chiffre"
      this.cannotSend= true
      return
    }  else if (isNaN(Date.parse(dateSortie) ) ){
      this.errorConnexion = false
      this.errorMessage = "Mauvais format de date"
      this.cannotSend= true
      return
    } else {
      
      const test:Date = new Date(parseInt(tabDate[0]), parseInt(tabDate[1]), parseInt(tabDate[2]));
      console.log(test)
      this.cannotSend= false
      res.titre = Titre;
      res.idTypeFilm = +Type;
      res.duree = duree
      res.lienImage = Image
      res.lienBandeAnnonce = Bande
      res.dateSortie = dateSortie
      res.synopsis = Synopsis;
      console.log(res)
      this.fetchGestionFilm.sendFilm(res).then((res: TypeFilm[]) => {
        console.log(res)
        window.location.reload()
      })
    
    }
      
    }


}
