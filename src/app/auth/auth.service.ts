import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ComptePayload } from 'src/types/compte';
import { LastPagePayload } from 'src/types/page';
import { CompteService } from '../compte/services/compte.service';
import { PrintMenuService } from '../services/print-menu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http : HttpClient, private cookieService: CookieService, private route : Router, private compteService: CompteService, private printMenuService : PrintMenuService ) {  
    
  }
 


  estAuthentifie(){
    if (this.cookieService.get('token') != undefined && this.cookieService.get('token') != ''){
      this.printMenuService.setConnected(true);
      return true;
    } 
    return false;
  }

  async connexion(compte:ComptePayload): Promise<any> {
    this.compteService.connexion(compte).then((result: any) => {
      console.log(result)
      if(result != undefined) {
        this.printMenuService.setConnected(true)
        let payload: string = this.cookieService.get('lastPage')
        if(payload != "") {
          let redirectionPage: LastPagePayload = JSON.parse(payload)
          this.cookieService.delete('lastPage')
          this.route.navigate([redirectionPage.url])
        } else {
          this.route.navigate([''])
        }
      } else {
        this.printMenuService.setConnected(false)
        //error message
      }
    })

  }

  async deconnexion() {
    this.cookieService.delete('token');
    this.cookieService.delete('UserID');
    this.route.navigate(['']);

  }
}
