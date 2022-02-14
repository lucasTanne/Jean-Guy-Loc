import { Component, OnInit } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { userProfil } from 'src/types/user';
import { PrintMenuService } from '../services/print-menu.service';
import { FecthUserProfileService } from './service/fecth-user-profile.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

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
    if(this.modifInfo){
      this.modifInfo = false;
    } else {
      this.modifInfo = true;
    }
  }

  modifInfoPass(){
    if(this.modifPass){
      this.modifPass = false;
    } else {
      this.modifPass = true;
    }
  }

}
