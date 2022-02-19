import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { ComptePayload } from 'src/types/compte';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService, 
      private authService : AuthService,
      private router: Router) {
    
  }

  ngOnInit(): void {
    if (this.authService.estAuthentifie()){
      this.router.navigate(['']);
    }
    
  }

  ngAfterViewInit(){
    this.printMenuService.setPrintMenu(false)
  }

  async connexion(login: string, password: string): Promise<void> {
    let comptePayload: ComptePayload = {
      username: login,
      password: password
    }
    await this.authService.connexion(comptePayload);
  }
}
