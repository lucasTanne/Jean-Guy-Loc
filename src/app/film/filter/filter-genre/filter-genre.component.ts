import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/types/categories';
import { FetchFilmService } from '../../services/fetch-film.service';

@Component({
  selector: 'app-filter-genre',
  templateUrl: './filter-genre.component.html',
  styleUrls: ['./filter-genre.component.css']
})
export class FilterGenreComponent implements OnInit {
  public listeCategories: Category[] = []
  @Output() filtreGenre: EventEmitter<number> = new EventEmitter()


  constructor(private fetchFilmService: FetchFilmService) { 
    this.fetchFilmService.getListCategories().then((res: Category[]) => {
      this.listeCategories = res
    })
  }

  public selectGenre(categorie: Category): void {
    console.log("Emit: " + categorie.idCategorie)
    this.filtreGenre.emit(categorie.idCategorie)
  }

  ngOnInit(): void {
  }

}
