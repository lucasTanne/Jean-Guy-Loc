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
  private listFilmFilterGenre: SliceFilmToList[] = [] 
  
  private noteFilter: number = -1
  private listFilmFilterNote: SliceFilmToList[] = []


  //Théorie
  private mapListFilmToPrint: Map<String, SliceFilmToList> = new Map()



  constructor(private printMenuService: PrintMenuService, private fetchFilmService: FetchFilmService, private starsService: StarsService, private printerService: PrinterService) {
    this.printMenuService.setPrintMenu(true)
    this.createSliceToPrint()
  }

  //WIP
  filters(): void {
    console.log("filters")
    // this.filterGenre()
    this.fGenre()

    //ending method
    this.createSliceToPrint()
  }

  //OK pour map empty
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
      })
    }
  }

  //OK
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














  // call by html @output
  // addFilterGenre(idCategorie: number): void {
    filterGenre(idCategorie: number): void {
    console.log("received: " + idCategorie)
    let i: number = this.listeFilter.indexOf(idCategorie)
    if(i !== -1) {
      this.listeFilter.splice(i, 1)
    } else {
      this.listeFilter.push(idCategorie)
    }
    if(this.listeFilter.length === 0) {
      this.mapListFilmToPrint = new Map()
    }
    this.filters()
  }

  //Call by filters
  // filterGenre() {
  fGenre(): void {
    console.log("fgenre")
    let add: boolean = true
    this.listeFilms.forEach((film: SliceFilmToList) => {
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


  // public filterGenre(idCategorie: number): void {
  //   console.log("received: " + idCategorie)
  //   this.updateListFilters(idCategorie).then(() => {
  //     this.updateListFilm().then(() => {
  //       console.log(this.listFilmsToPrint)
  //       // this.filteredFilmsToPrintList()
  //     })
  //   })
  // }

  // updateListFilters(idCategorie: number): Promise<any> {
  //   return new Promise<any>((resolve) => {
  //     let newSlice: number[] = []
  //     if(!this.sliceFilterContainsCat(idCategorie)) {
  //       if(this.listeFilter.length === 0){
  //         this.listeFilter.push(idCategorie)
  //       } else {
  //         this.listeFilter.forEach((filter) => {
  //           newSlice.push(filter)
  //         })
  //         newSlice.push(idCategorie)
  //         this.listeFilter = newSlice
  //       }
  //     } else {
  //       this.listeFilter.forEach((filter) => {
  //         if(filter !== idCategorie) {
  //           newSlice.push(filter)
  //         }
  //       })
  //       this.listeFilter = newSlice
  //     }
  //     console.log(this.listeFilter)
  //     resolve(null)
  //   })
  // }

  sliceFilterContainsCat(idCategorie: number): boolean {
    for(let i = 0; i < this.listeFilter.length; i++) {
      if(this.listeFilter[i] === idCategorie){
        return true
      }
    }
    return false
  }

  updateListFilm(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.listFilmFilterGenre = []
      let add: boolean = false
      this.listeFilms.forEach((film: SliceFilmToList) => {
        add = true
        this.listeFilter.forEach((filter: number) => {
          if(film.objFilm.categories.indexOf(filter) === -1) {
            add = false
          }
        })
        if(add) {
          this.listFilmFilterGenre.push(film)
        }
      })
      resolve(null)
    })
  }















  public filterNote(value: number): void {
    console.log("received: " + value)
    this.doingfilterNote(value).then(() => {
      console.log(this.listFilmFilterNote)
      // this.filteredFilmsToPrintList()
    })
  }

  doingfilterNote(value: number): Promise<any> {
    return new Promise<any>((resolve) => {
      let note = Math.round(value)
      let newSlice: SliceFilmToList[] = []
      if(this.noteFilter === -1){
        this.noteFilter = note
        this.listFilmFilterNote = this.appendListFilmToSlice(this.noteFilter)
      } else {
        if(this.noteFilter === note){
          this.listFilmFilterNote = this.appendListFilmToSlice(-1)
        } else {
          let firstSlice: SliceFilmToList[] = this.appendListFilmToSlice(note)
          this.listFilmFilterNote = this.appendListFilmFilteredToSlice(newSlice, firstSlice, note)
        }
      }
      resolve(null)
    })
  }

  appendListFilmToSlice(note: number): SliceFilmToList[]{
    if(note === -1){
      return this.listeFilms
    }
    let newSlice: SliceFilmToList[] = []
    this.listeFilms.forEach((film: SliceFilmToList) => {
      if(film.objFilm.moyenne === note) {
        newSlice.push(film)
      }
    })
    return newSlice
  }

  appendListFilmFilteredToSlice(newSlice: SliceFilmToList[], actualSlice: SliceFilmToList[], note: number): SliceFilmToList[]{
    actualSlice.forEach((film: SliceFilmToList) => {
      if(film.objFilm.moyenne === note) {
        newSlice.push(film)
      }
    })
    return newSlice
  }


























  

  listFilmFilterGenreToPrint(): void {
    this.listFilmFilterGenre.forEach((film: SliceFilmToList) => {
      this.listFilmsToPrint.push(film.objFilm)
    })
  }

  listFilmFilterNoteToPrint(): void {
    this.listFilmFilterNote.forEach((film: SliceFilmToList) => {
      this.listFilmsToPrint.push(film.objFilm)
    })
  }
}

