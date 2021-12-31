import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintMenuService } from '../services/print-menu.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent {

  constructor(private route: ActivatedRoute, private router: Router, private printMenuService: PrintMenuService) { }

  goMenu(): void {
    this.router.navigate(['/accueil']);
  }

  printMenu(): boolean {
    return this.printMenuService.getPrintMenu()
  }
}
