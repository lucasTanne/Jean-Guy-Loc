import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { PrintMenuService } from '../services/print-menu.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent {
  public connected: boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private printMenuService: PrintMenuService, private cookieService: CookieService, private authService : AuthService) { }
  
  goMenu(): void {
    this.router.navigate(['']);
  }

  printMenu(): boolean {
    this.connected = this.printMenuService.getConnected()  
    return this.printMenuService.getPrintMenu()
  }

  public userDeconnexion(): void {
    this.authService.deconnexion();
    this.printMenuService.setConnected(false)
  }
}
