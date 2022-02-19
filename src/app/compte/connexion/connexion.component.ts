import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CompteService } from '../services/compte.service';
import { CookieService } from 'ngx-cookie-service';
import { ComptePayload } from 'src/types/compte';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService, 
      private compteService: CompteService, 
      private route: ActivatedRoute, 
      private router: Router,
      private cookieService: CookieService) {
    this.printMenuService.setPrintMenu(false)
  }

  ngOnInit(): void {
  }

  connexion(login: string, password: string): void {
    let comptePayload: ComptePayload = {
      username: login,
      password: password
    }
    this.compteService.connexion(comptePayload).then((result: any) => {
      if(result != undefined) {
        this.printMenuService.setConnected(true)
        this.router.navigate(['/accueil'])
      } else {
        this.printMenuService.setConnected(false)
        //error message
      }
    })
  }

}
