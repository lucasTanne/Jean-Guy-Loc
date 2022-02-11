import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrintMenuService } from '../services/print-menu.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent {
  public connected: boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private printMenuService: PrintMenuService, private cookieService: CookieService) { }

  goMenu(): void {
    this.router.navigate(['/accueil']);
  }

  printMenu(): boolean {
    this.connected = this.printMenuService.getConnected()
    return this.printMenuService.getPrintMenu()
  }

  public userDeconnexion(): void {
    this.cookieService.set("token", "")
    this.cookieService.set("UserID", "")
    this.printMenuService.setConnected(false)
    this.goMenu()
  }
}
