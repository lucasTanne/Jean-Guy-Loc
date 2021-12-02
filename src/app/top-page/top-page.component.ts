import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent {
  printMenu: boolean = false

  constructor(private route: ActivatedRoute, private router: Router) { }

  goMenu(): void {
    this.router.navigate(['/acceuil']);
  }
}
