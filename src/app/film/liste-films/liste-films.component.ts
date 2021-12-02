import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService) {
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
