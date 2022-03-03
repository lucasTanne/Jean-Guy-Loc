import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { CommentaireInfo, CommentToSend, ListCommentaireInfo } from 'src/types/commentaire';
import { FilmItem } from 'src/types/film-item';
import { Note, NoteToSend } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { StarsService } from '../services/stars.service';
import { NewLocation, NewLocationStreaming } from 'src/types/disponibilites';


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
  public commentaires: ListCommentaireInfo = {
    infosCommentaires: [{
      username: "username",
      idUtil: -1,
      valeurNote: 0,
      dateCom: new Date(1970, 1, 1),
      textCom: "nothing",
      idCom: -1,
      nbStarBlack: 5,
      nbStarGold: 0
    }],
    nbCommentaires: -1,
    nbNotes: -1
  }
  public idUtilisateur: string = "-1"
  public idFilm: string | null = ""
  public nbStarGold: number = 0
  public nbStarBlack: number = 5
  public noteComment: number = -1  
  public printError: boolean = false
  public errorConnexion: boolean = false
  public errorMessage: string = ""
  public cannotLocate: boolean = false
  public printSuccess: boolean = false
  public messageSuccess: string = ""

  constructor(private printMenuService: PrintMenuService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private fetchFilmService: FetchFilmService,
      private cookieService: CookieService,
      private starsService: StarsService) {

    this.printMenuService.setPrintMenu(true)
    this.activatedRoute.paramMap.subscribe(param => {
      this.idFilm = param.get('id')
      let idUtil = this.cookieService.get('UserID')
      this.idUtilisateur = idUtil === "" ? "-1" : idUtil
      if(this.idFilm != null){
        this.fetchFilmService.getFilm(this.idFilm).then((res: FilmItem) => {
          this.film = res
          this.fetchFilmService.getFilmNotes(this.film.idFilm).then((notes: Note[]) => {
            this.film.notes = notes
            let res = this.starsService.starsNumberFromArray(this.film.notes)
            this.nbStarBlack = res[0]
            this.nbStarGold = res[1]
          })
          this.fetchFilmService.getFilmCommentaires(this.film.idFilm, this.idUtilisateur).then((commentaires: ListCommentaireInfo) => {
            commentaires.infosCommentaires.forEach((com) => {
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
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorConnexion = true
      this.errorMessage = "Pour envoyer un commentaire vous devez être connecté !"
      this.printError = true
      return
    }
    if(this.noteComment != -1 && comment != "" && this.idFilm != null) {
      this.errorConnexion = false
      this.errorMessage = ""
      this.printError = false

      let userID = idUtilisateur
      let noteToSend: NoteToSend = {
        idFilm: parseInt(this.idFilm),
        valeur: this.noteComment,
        idUtilisateur: parseInt(userID)
      }

      this.fetchFilmService.createNote(noteToSend).then((idNote: number) => {
        console.log(idNote)
        let date = new Date()
        let month: number = date.getMonth() + 1
        let m: string = month.toString().length === 2 ? month.toString() : "0" + month.toString()
        let d: string = date.getDate().toString().length === 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        let dateCom = date.getFullYear() + "-" + m + "-" + d
        let commentToSend: CommentToSend = {
          idNote: idNote,
          dateCommentaire: dateCom,
          contenu: comment
        }
        this.fetchFilmService.createComment(commentToSend).then((res: any) => {
          // window.location.reload()
          console.log(res)
        }).catch((e) => {
          console.log("Cannot create comment")
        })
      }).catch((e) => {
        console.log("Cannot create note")
      })
    } else {
      this.errorConnexion = false
      this.errorMessage = "Pour envoyer votre commentaire, vous devez écrire un message et selectionner une note !"
      this.printError = true
    }
  }

  public streamingLocation(): void{
    let idUtilisateur = this.cookieService.get('UserID')
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorConnexion = true
      this.errorMessage = "Pour Louer ce film vous devez être connecté !"
      this.cannotLocate = true
      return
    }
    this.errorConnexion = false
    this.errorMessage = ""
    this.printError = false
    if(this.idFilm != null) {
      let date = new Date()
      let month: number = date.getMonth() + 1
      let m: string = month.toString().length === 2 ? month.toString() : "0" + month.toString()
      let d: string = date.getDate().toString().length === 2 ? date.getDate().toString() : "0" + date.getDate().toString()
      let currentDate = date.getFullYear() + "-" + m + "-" + d
      let locationPayload : NewLocationStreaming = {
        dateDeLocation: currentDate,
        duree: 7,
        idFilm: parseInt(this.idFilm),
        idUtilisateur: parseInt(idUtilisateur)
      }
      this.fetchFilmService.createStreamingLocation(locationPayload).then((res) => {
        this.messageSuccess = "La location à bien été enregistrer."
        this.printSuccess = true
      }).catch((e) => {
        this.errorConnexion = false
        this.errorMessage = "Erreur lors de la location en streaming de ce film."
        this.printError = true
      })
    }
  }

  ngOnInit(): void {
  }

}
