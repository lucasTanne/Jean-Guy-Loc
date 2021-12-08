import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService, private compteService: CompteService, private route: ActivatedRoute, private router: Router) {
    this.printMenuService.setPrintMenu(false)
  }

  ngOnInit(): void {
  }

  connexion(login: string, password: string): void {
    this.compteService.connexion(login, password).then((result) => {
      if(result) {
        this.router.navigate(['/acceuil'])
      } else {
        alert('CONNECTION FAILED')
      }
    })
  }

}
