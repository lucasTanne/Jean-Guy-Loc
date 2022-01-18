import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CommentaireInfo, CommentToSend } from 'src/types/commentaire';
import { FilmItem } from 'src/types/film-item';
import { Note, NoteToSend } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';


@Component({
  selector: 'app-vue-film',
  templateUrl: './vue-film.component.html',
  styleUrls: ['./vue-film.component.css']
})
export class VueFilmComponent implements OnInit {
  public film: FilmItem = {
    idFilm: -1,
    idTypeFilm: -1,
    titre: "Aucun film",
    lienImage: "#",
    lienBandeAnnonce: "#",
    synopsis: "vide",
    duree: 0.0,
    dateSortie: new Date(1970, 1, 1),
    notes: [{
      idNote: -1,
      idFilm: -1,
      idUtilisateur: -1,
      valeur: 0
    }],
    categories: ["aucune"],
    realisateurs: ["aucun"],
    acteurs: ["aucun"]
  }
  public commentaires: CommentaireInfo[] = [{
    username: "username",
    idUtilisateur: -1,
    valeurNote: 0,
    dateCommentaire: new Date(1970, 1, 1),
    contenu: "nothing",
    idCommentaire: -1,
    nbStarBlack: 5,
    nbStarGold: 0,
  }]
  private idFilm: string | null = ""
  public nbStarGold: number = 0
  public nbStarBlack: number = 5
  public noteComment: number = -1  
  public cannotSend: boolean = false

  constructor(private printMenuService: PrintMenuService, private router: Router, private activatedRoute: ActivatedRoute, private fetchFilmService: FetchFilmService, private cookieService: CookieService) {
    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('id')
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.fetchFilmService.getFilmNotes(this.film.idFilm).then((notes: Note[]) => {
            this.film.notes = notes
            this.setStarNumber()
          })
          // this.fetchFilmService.getFilmCommentaires(this.film.idFilm).then((commentaires: Commentaire[]) => {
          //   this.commentaires = commentaires
          // })
        })
      }
    })
  }

  // Returns a string that contains content of an array separated by virgule
  public getContentValue(list: string[]): string {
    if(list === undefined) {
      return "aucun"
    } else if (list.length == 0) {
      return "aucun"
    }

    let res: string = list[0]
    for(let i = 1; i < list.length; i++) {
      res += (", " + list[i])
    }
    return res
  }

  // Calculate number of gold and black stars using film.notes
  private setStarNumber(): void {
    let notes: Note[] = this.film.notes
    if(notes.length === undefined || notes.length === 0) {
      this.nbStarGold = 0
      this.nbStarBlack = 5
    } else if (notes.length === 1) {
      this.nbStarGold = notes[0].valeur
      this.nbStarBlack = 5 - notes[0].valeur
    } else {
      let moyenne: number = 0
      let nbNotes: number = 0
      notes.forEach((note: Note, i: number) => {
        nbNotes++
        moyenne += note.valeur
      })
      moyenne = Math.round(moyenne / nbNotes)
      this.nbStarGold = moyenne
      this.nbStarBlack = 5 - moyenne
    }
  }

  public setNote(note: number){
    this.noteComment = note
  }

  public sendComment(comment: string){
    if(this.noteComment != -1 && comment != "" && this.idFilm != null) {
      this.cannotSend = false;
      let userID = this.cookieService.get('UserID')
      let noteToSend: NoteToSend = {
        idFilm: parseInt(this.idFilm),
        valeur: this.noteComment,
        idUtilisateur: parseInt(userID)
      }

      this.fetchFilmService.createNote(noteToSend).then((idNote: number) => {
        console.log(idNote)
        let date = new Date()
        let dateCom = date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate()
        let commentToSend: CommentToSend = {
          idNote: idNote,
          dateCommentaire: dateCom,
          contenu: comment
        }
        this.fetchFilmService.createComment(commentToSend).then((res: any) => {
          this.router.navigate([this.router.url])
        }).catch((e) => {
          console.log("Cannot create comment")
        })
      }).catch((e) => {
        console.log("Cannot create note")
      })
    } else {
      this.cannotSend = true
    }
  }

  ngOnInit(): void {
  }

}
