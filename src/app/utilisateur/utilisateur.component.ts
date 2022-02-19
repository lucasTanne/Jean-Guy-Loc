import { Component, OnInit } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { FilmsSPLoue, FilmLouePhysique, FilmLoueStreaming,putUserInfo, putUserPass, userProfil } from 'src/types/user';
import { PrintMenuService } from '../services/print-menu.service';
import { FecthUserProfileService } from './service/fecth-user-profile.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  public cannotSend: boolean = false
  public cannotSendPass: boolean = false
  public errorMessage: string = ""
  public errorMessagePass: string = ""
  
  public user: userProfil= {
    pseudonyme: "",
    motDePasse: "",
    adresse:"",
    nom: "",
    prenom: ""
  }

  public filmPhysique :FilmLouePhysique[] = [{
    idLocationFilm: -1 ,
    dateDeLocation: new Date(),
    duree:-1,
    idUtilisateur:-1 ,
    idFilm: -1,
    estRendu : false,
    affiche: "",
    titre : ""
  }]

  public filmStreaming : FilmLoueStreaming[] = [{
    idLocationStreaming: -1 ,
    dateDeLocation: new Date() ,
    duree:-1 ,
    idUtilisateur:-1 ,
    idFilm: -1 ,
    affiche : "",
    titre : ""
  }]

  public films : FilmsSPLoue = {
    filmsPhysique: {
        LocPhysiqueNow : this.filmPhysique,
        LocPhysiqueOlder: this.filmPhysique,
        LocPhysiqueCome : this.filmPhysique
    },
    filmsStreaming: {
        LocStreamingNow : this.filmStreaming,
        LocStreamingOlder : this.filmStreaming,
        LocStreamingCome : this.filmStreaming
    }
  }

 



  modifInfo = false;
  modifPass = false;

  constructor(private printMenuService : PrintMenuService, private FetchUserProfilService : FecthUserProfileService, private cookieService: CookieService,) { 
    this.printMenuService.setPrintMenu(true);

    let idUtilisateur = this.cookieService.get('UserID')
    this.FetchUserProfilService.getCurrentUser(+idUtilisateur).then((list: userProfil) => {
      if (list != null) {
        this.user = list
      }
    }).catch((e) => {
    })

    this.FetchUserProfilService.getFilmsLoue(+idUtilisateur).then((res: FilmsSPLoue) => {
      if (res != undefined) {
        this.films = res
        console.log(res)
      }
    }).catch((a:any) => {
    })





  }

  ngOnInit(): void {

  }

  public modifInfoUser(){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == ""|| idUtilisateur == null) {

      this.errorMessage = "Pour envoyer un commentaire vous devez être connecté !"
      this.cannotSend = true
      return
    }


    if(this.modifInfo){
      this.modifInfo = false;
    } else {
      this.modifInfo = true;
    }
  }


  public sendInfoUser(adresse : string, nom : string, prenom : string){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorMessage = "Vous n'êtes pas connecté !"
      this.cannotSend = true
      return
    }
    const user : putUserInfo = {
      adresse: adresse,
      nom: nom,
      prenom: prenom
    }
    this.FetchUserProfilService.updateInfoUser(user, +idUtilisateur).then((res: any) => {
      window.location.reload();
      this.modifInfoUser();
    }).catch((e) => {
      console.log("Cannot create comment")
    })
  }

  public modifInfoPass(){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == ""|| idUtilisateur == null) {

      this.errorMessagePass = "Vous n'êtes pas connecté !"
      this.cannotSendPass = true
      return
    }
    if(this.modifPass){
      this.modifPass = false;
    } else {
      this.modifPass = true;
    }
  }

  public sendInfoPass(pseudo : string, pass : string){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorMessage = "Vous n'êtes pas connecté !"
      this.cannotSend = true
      return
    }
    const user : putUserPass = {
      pseudonyme: pseudo,
      motDePasse: pass
    }
    this.FetchUserProfilService.updateInfoPass(user, +idUtilisateur).then((res: any) => {
      window.location.reload();
      this.modifInfoPass();
    }).catch((e) => {
      console.log("Cannot create comment")
    })
  }

  


}
