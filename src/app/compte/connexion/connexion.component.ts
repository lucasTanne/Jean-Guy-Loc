import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CompteService } from '../services/compte.service';
import { CookieService } from 'ngx-cookie-service';

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
    this.compteService.connexion(login, password).then((result: any) => {
      if(result) {
        this.cookieService.set('UserID', result)
        this.router.navigate(['/accueil'])
      } else {
        alert('CONNECTION FAILED')
      }
    })
  }

}
