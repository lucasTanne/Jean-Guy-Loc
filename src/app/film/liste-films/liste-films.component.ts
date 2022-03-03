import { Component } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { FilmItem, FilmToList, SliceFilmToList } from 'src/types/film-item';
import { Note, Notes } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { PrinterService } from '../services/printer.service';
import { StarsService } from '../services/stars.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent {
  public listeFilms: SliceFilmToList[] = []
  public listFilmsToPrint: FilmToList[] = []

  private listeFilter: number[] = []
  
  private noteFilter: number = -1

  private mapListFilmToPrint: Map<String, SliceFilmToList> = new Map()

  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private starsService: StarsService, private printerService: PrinterService) {
    this.printMenuService.setPrintMenu(true)
    this.createSliceToPrint()
  }

  filters(): void {
    this.fGenre()
    this.fNote()

    this.createSliceToPrint()
  }

  createSliceToPrint(): void {
    console.log("createSliceToPrint")
    console.log(this.mapListFilmToPrint)
    if(this.mapListFilmToPrint.size === 0) {
      console.log("map empty")
      this.getFilmList().then((res: SliceFilmToList[]) => {
        this.listeFilms = res
        console.log("Total films: " + res.length)
      })
    } else {
      console.log("map not empty")
      let newSLice: FilmToList[] = [];
      ((): Promise<any> => {
        return new Promise<any>((resolve) => {
          this.mapListFilmToPrint.forEach((value: SliceFilmToList) => {
            newSLice.push(value.objFilm)
          })
          resolve(null)
        })
      })().then(() => {
        console.log(newSLice)
        this.listFilmsToPrint = newSLice
        this.mapListFilmToPrint = new Map()
      })
    }
  }

  getFilmList(): Promise<any> {
    return new Promise((resolve) => {
      this.fetchFilmService.getListFilmsWithAverage().then((res: SliceFilmToList[]) => {
        console.log(res)
        res.forEach((film: SliceFilmToList) => {
          film.objFilm.moyenne = Math.round(film.objFilm.moyenne)
          if(film.objFilm.synopsis != ""){
            film.objFilm.synopsis = this.printerService.formatSynopsis(film.objFilm.synopsis)
          }else{
            film.objFilm.synopsis = "Aucun résumé"
          }
          this.listFilmsToPrint.push(film.objFilm)
        })
        resolve(res)
      }).catch((e) => {
        console.log("catch component")
        console.log(e)
      })
    })
  }

  filterGenre(idCategorie: number): void {
    console.log("received: " + idCategorie)
    let i: number = this.listeFilter.indexOf(idCategorie)
    if(i !== -1) {
      this.listeFilter.splice(i, 1)
    } else {
      this.listeFilter.push(idCategorie)
    }
    this.filters()
  }

  fGenre(): void {
    console.log("fgenre")
    let add: boolean = true
    let sliceTemp: SliceFilmToList[]
    if(this.mapListFilmToPrint.size !== 0){
      sliceTemp = Array.from(this.mapListFilmToPrint.values())
    } else {
      sliceTemp = this.listeFilms
    }

    sliceTemp.forEach((film: SliceFilmToList) => {
      if(this.mapListFilmToPrint.size === 0) {
        for(let i = 0; i < this.listeFilter.length; i++) {
          let idCategorie: number = this.listeFilter[i]
          if(film.objFilm.categories.indexOf(idCategorie) === -1) {
            console.log("nop: " + film.objFilm)
            add = false
          }
        }
      }
      let f = this.mapListFilmToPrint.get(film.objFilm.idFilm.toString())
      if (f !== undefined) {
        let objFilm = f.objFilm
        this.listeFilter.forEach((idCategorie: number) => {
          if(objFilm.categories.indexOf(idCategorie) === -1) {
            console.log("deleted: " + objFilm)
            this.mapListFilmToPrint.delete(objFilm.idFilm.toString())
            add = false
          }
        })
      } else {
        this.listeFilter.forEach((idCategorie: number) => {
          if(film.objFilm.categories.indexOf(idCategorie) === -1) {
            console.log("nop: " + film.objFilm)
            add = false
          }
        })
      }
      if(add) {
        console.log("add: " + film.objFilm)
        this.mapListFilmToPrint.set(film.objFilm.idFilm.toString(), film)
      }
      add = true
    })
  }

  public filterNote(value: number): void {
    console.log("received: " + value)
    if(this.noteFilter === value) {
      this.noteFilter = -1
    } else {
      this.noteFilter = Math.round(value)
    }

    this.filters()
  }

  fNote(): void {
    console.log("fnote")
    if(this.noteFilter === -1) {
      return
    }
    let add: boolean = true
    let sliceTemp: SliceFilmToList[]
    if(this.mapListFilmToPrint.size !== 0){
      sliceTemp = Array.from(this.mapListFilmToPrint.values())
    } else {
      sliceTemp = this.listeFilms
    }

    sliceTemp.forEach((film: SliceFilmToList) => {
      if(this.mapListFilmToPrint.size === 0) {
        if(film.objFilm.moyenne !== this.noteFilter) {
          console.log("nop: " + film.objFilm)
          add = false
        }
      }
      let f = this.mapListFilmToPrint.get(film.objFilm.idFilm.toString())
      if (f !== undefined) {
        let objFilm = f.objFilm
        if(objFilm.moyenne !== this.noteFilter) {
          console.log("deleted: " + objFilm)
          this.mapListFilmToPrint.delete(objFilm.idFilm.toString())
          add = false
        }
      } else {
        if(film.objFilm.moyenne !== this.noteFilter) {
          console.log("nop: " + film.objFilm)
          add = false
        }
      }
      if(add) {
        console.log("add: " + film.objFilm)
        this.mapListFilmToPrint.set(film.objFilm.idFilm.toString(), film)
      }
      add = true
    })
  }
}

