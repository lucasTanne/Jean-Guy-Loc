import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService) {
    this.printMenuService.setPrintMenu(false)
  }

  ngOnInit(): void {
  }

}
