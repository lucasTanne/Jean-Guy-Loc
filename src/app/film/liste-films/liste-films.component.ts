import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem } from 'src/types/film-item';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {
  public listeFilms: FilmItem[] = [
    {
      id: 0,
      image: "../../../assets/johnWick.jpg",
      titre: "John wick",
      synopsys: "ceci est un synopsys du film John wick",
      note: 5
    }, {
      id: 1,
      image: "../../../assets/lastNightInSoho.jpg",
      titre: "Last Night in Soho",
      synopsys: "ceci est un synopsys du film Last Night in Soho",
      note: 3
    }
  ]
  constructor(private printMenuService: PrintMenuService) {
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
