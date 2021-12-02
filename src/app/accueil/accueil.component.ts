import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from '../services/print-menu.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService) {
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
