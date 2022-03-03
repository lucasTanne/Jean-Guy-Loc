import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FilmLouePhysique, FilmLoueRendu, UserList } from 'src/types/user';
import { FetchRenduService } from './service/fetch-rendu.service';

@Component({
  selector: 'app-rendu-film',
  templateUrl: './rendu-film.component.html',
  styleUrls: ['./rendu-film.component.css']
})
export class RenduFilmComponent implements OnInit {

  public lesUsers: UserList[] = [{
    idUtilisateur : -1,
    nom : "",
    prenom : ""
  }]

  public valueSelect = -1;
  public lesFilms: FilmLouePhysique[] = []; 

  constructor(private fetchRendu : FetchRenduService,private cookieService: CookieService) { 

    let idUtilisateur = this.cookieService.get('UserID')
    this.fetchRendu.getUsers().then((res: UserList[]) => {
      for (const user of res) {
        this.lesUsers.push({
          idUtilisateur : user.idUtilisateur,
          nom : user.nom,
          prenom : user.prenom
        });
      }

    })  

  }

  ngOnInit(): void {
  }


  searchFilmRent( id :number){
    console.log(id);
    
    this.valueSelect = id;
    this.fetchRendu.getFilmsRentNow(id).then((res: FilmLouePhysique[]) => {
      this.lesFilms = res
      
    }).catch((e) => {
    });
  }

  updateFilmRent (id:number){
    let filmRendu : FilmLoueRendu= {
     
      dateDeLocation: new Date(),
      duree: 0,
      idUtilisateur: 0,
      idFilm: 0,
      estRendu: false
  
    };
    for (const film of this.lesFilms){
      if (film.idLocationFilm == id){
        filmRendu.dateDeLocation=film.dateDeLocation;
        filmRendu.duree=film.duree;
        filmRendu.idUtilisateur=film.idUtilisateur;
        filmRendu.idFilm=film.idFilm;
        filmRendu.estRendu = true;

        console.log(filmRendu)
        this.fetchRendu.updateRenduFilm(filmRendu, film.idLocationFilm).then((res: FilmLouePhysique[]) => {
          window.location.reload()
          
        }).catch((e) => {
        });


      }
    }
    console.log(filmRendu)

  }
}
