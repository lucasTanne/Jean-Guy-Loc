import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { newUser } from 'src/types/compte';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public cannotSend : boolean = false;
  public cannotConnect: boolean = false
  public errorConnexion: boolean = false
  public errorMessage: string = ""

  constructor(private printMenuService: PrintMenuService, private authService : AuthService, private router: Router) {
    this.printMenuService.setPrintMenu(false)
  }

  public inscription(login: string, mdp: string, adresse: string, nom: string, prenom: string): void {
    let payload: newUser = {
      pseudonyme: login,
      motDePasse: mdp,
      adresse: adresse,
      nom: nom,
      prenom: prenom,
      estAdmin: false
    }
    this.authService.inscription(payload).then((res) => {
      this.router.navigate(['connexion']);
    })
  }

  ngOnInit(): void {}

}
