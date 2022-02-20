import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/types/categories';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterGenre: EventEmitter<number> = new EventEmitter()
  @Output() filterNote: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public addFilterGenre(idCategorie: number): void {
    console.log("received: " + idCategorie)
    console.log("re send: " + idCategorie)
    this.filterGenre.emit(idCategorie)
  }

  public addFilterNote(note: number): void {
    console.log("received: " + note)
    console.log("re send: " + note)
    this.filterNote.emit(note)
  }

}
