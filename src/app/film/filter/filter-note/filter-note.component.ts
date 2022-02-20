import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-note',
  templateUrl: './filter-note.component.html',
  styleUrls: ['./filter-note.component.css']
})
export class FilterNoteComponent implements OnInit {
  @Output() filtreNote: EventEmitter<number> = new EventEmitter()

  constructor() { }

  public filterNote(value: number): void {
    console.log("send: " + value)
    this.filtreNote.emit(value)
  }

  ngOnInit(): void {
  }

}
