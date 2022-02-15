import { Component, OnInit } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { putUserInfo, putUserPass, userProfil } from 'src/types/user';
import { PrintMenuService } from '../services/print-menu.service';
import { FecthUserProfileService } from './service/fecth-user-profile.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  public cannotSend: boolean = false
  public errorMessage: string = ""
  
  public user: userProfil= {
    pseudonyme: "",
    motDePasse: "",
    adresse:"",
    nom: "",
    prenom: ""
  }

  modifInfo = false;
  modifPass = false;

  constructor(private printMenuService : PrintMenuService, private FetchUserProfilService : FecthUserProfileService, private cookieService: CookieService,) { 
    this.printMenuService.setPrintMenu(true);

    let idUtilisateur = this.cookieService.get('UserID')
    this.FetchUserProfilService.getCurrentUser(+idUtilisateur).then((list: userProfil) => {
      this.user = list
    }).catch((e) => {
    })

  }

  ngOnInit(): void {

  }

  modifInfoUser(){
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


  sendInfoUser(adresse : string, nom : string, prenom : string){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorMessage = "Pour envoyer un commentaire vous devez être connecté !"
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

  modifInfoPass(){
    if(this.modifPass){
      this.modifPass = false;
    } else {
      this.modifPass = true;
    }
  }

  sendInfoPass(pseudo : string, pass : string){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorMessage = "Pour envoyer un commentaire vous devez être connecté !"
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
