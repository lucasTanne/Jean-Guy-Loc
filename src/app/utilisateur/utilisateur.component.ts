import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from '../services/print-menu.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  constructor(private printMenuService : PrintMenuService) { 
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
