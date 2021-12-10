import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmInfo } from 'src/types/film-info';

@Component({
  selector: 'app-vue-film',
  templateUrl: './vue-film.component.html',
  styleUrls: ['./vue-film.component.css']
})
export class VueFilmComponent implements OnInit {
  private idFilm: string | null = ""
  public film: FilmInfo = {
    id: 0,
    image: "../../../assets/johnWick.jpg",
    titre: "John Wick",
    synopsys: "ceci est un synopsys du film John wick",
    duree: "1,41",
    dateSortie: new Date(2014, 10, 29),
    categories: [
      "Action",
      "Thriller"
    ],
    realisateurs: [
      "David Leitch",
      "Chad Stahelski"
    ],
    acteurs: [
      "Keanu Reeves",
      "Michael Nyqvist",
      "Alfie Allen"
    ],
    note: 4 
  }

  constructor(private printMenuService: PrintMenuService, private activatedRoute: ActivatedRoute) {
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('id')
    })
  }

  // Returns a string that contains content of an array separated by virgule
  public getContentValue(list: string[]): string {
    if (list.length == 0) {
      return ""
    }

    let res: string = list[0]
    for(let i = 1; i < list.length; i++) {
      res += (", " + list[i])
    }
    return res
  }

  ngOnInit(): void {
  }

}
