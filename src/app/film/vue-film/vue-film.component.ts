import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CommentaireInfo, CommentToSend } from 'src/types/commentaire';
import { FilmItem } from 'src/types/film-item';
import { Note, NoteToSend } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { StarsService } from '../services/stars.service';


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
    idUtil: -1,
    valeurNote: 0,
    dateCom: new Date(1970, 1, 1),
    textCom: "nothing",
    idCom: -1,
    nbStarBlack: 5,
    nbStarGold: 0,
  }]
  private idFilm: string | null = ""
  public nbStarGold: number = 0
  public nbStarBlack: number = 5
  public noteComment: number = -1  
  public cannotSend: boolean = false
  public errorMessage: string = ""

  constructor(private printMenuService: PrintMenuService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private fetchFilmService: FetchFilmService,
      private cookieService: CookieService,
      private starsService: StarsService) {

    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('id')
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.fetchFilmService.getFilmNotes(this.film.idFilm).then((notes: Note[]) => {
            this.film.notes = notes
            let res = this.starsService.starsNumberFromArray(this.film.notes)
            this.nbStarBlack = res[0]
            this.nbStarGold = res[1]
          })
          this.fetchFilmService.getFilmCommentaires(this.film.idFilm).then((commentaires: CommentaireInfo[]) => {
            commentaires.forEach((com) => {
              let res = this.starsService.starsNumber(com.valeurNote)
              com.nbStarBlack = res[0]
              com.nbStarGold = res[1]
            })
            this.commentaires = commentaires
            console.log(this.commentaires)
          })
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

  public setNote(note: number){
    this.noteComment = note
  }

  public sendComment(comment: string){
    let idUtilisateur = this.cookieService.get('UserID')
    console.log(idUtilisateur)
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorMessage = "Pour envoyer un commentaire vous devez être connecté !"
      this.cannotSend = true
      return
    }
    if(this.noteComment != -1 && comment != "" && this.idFilm != null) {
      this.cannotSend = false;
      let userID = idUtilisateur
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
      this.errorMessage = "Pour envoyer votre commentaire, vous devez écrire un message et selectionner une note !"
      this.cannotSend = true
    }
  }

  ngOnInit(): void {
  }

}
