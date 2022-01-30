import { Injectable } from '@angular/core';
import { Note } from 'src/types/note';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor() { }

  // Calculate how many black and gold stars using the given note
  // returns an array of 2 number [nbStarBlack, nbStarGold]
  starsNumber(note: number): [number, number] {
    if(note <= 0) {
      return [5, 0]
    }else if(note >= 5){
      return [0, 5]
    }
    let nbBlack = 5 - Math.round(note)
    let nbGold = 5 - nbBlack
    return [nbBlack, nbGold]
  }

  // Calculate number of gold and black stars using array of notes
  // returns an array of 2 number [nbStarBlack, nbStarGold]
  public starsNumberFromArray(notes: Note[]): [number, number] {
    if(notes.length === undefined || notes.length === 0) {
      return [5, 0]
    }
    let nbBlack: number = 0
    let nbGold: number = 0
    if (notes.length === 1) {
      nbBlack = 5 - Math.round(notes[0].valeur)
      nbGold = 5 - nbBlack
      return [nbBlack, nbGold]
    }
    let moyenne: number = 0
    let nbNotes: number = 0
    notes.forEach((note: Note, i: number) => {
      nbNotes++
      moyenne += note.valeur
    })
    moyenne = Math.round(moyenne / nbNotes)
    nbBlack = 5 - moyenne
    nbGold = 5 - nbBlack
    return [nbBlack, nbGold]
  }

  // Calculate number of gold stars using array of notes
  starsNumberGoldFromArray(notes: Note[]): number {
    if(notes === undefined || notes.length === 0) {
      return 0
    } else if (notes.length === 1) {
      return notes[0].valeur
    } else {
      let moyenne: number = 0
      let nbNotes: number = 0
      notes.forEach((note: Note, i: number) => {
        nbNotes++
        moyenne += note.valeur
      })
      return Math.round(moyenne / nbNotes)
    }
  }
}
