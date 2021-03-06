import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrintMenuService } from 'src/app/services/print-menu.service';
import { ChangeCommentary, CommentaireInfo, CommentToSend, ListCommentaireInfo } from 'src/types/commentaire';
import { FilmItem, InfoFilm } from 'src/types/film-item';
import { Note, NoteToSend } from 'src/types/note';
import { FetchFilmService } from '../services/fetch-film.service';
import { StarsService } from '../services/stars.service';
import { NewLocation, NewLocationStreaming } from 'src/types/disponibilites';
import { Acteur, Realisateur } from 'src/types/info';
import { resolveProjectReferencePath } from 'typescript';
import { Category } from 'src/types/categories';


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
    nbNotes: -1,
    idCommUtilisateur: -1,
    idNoteUtilisateur: -1
  }
  public firstCommentaire: CommentaireInfo = {
    username: "username",
    idUtil: -1,
    valeurNote: 0,
    dateCom: new Date(1970, 1, 1),
    textCom: "nothing",
    idCom: -1,
    nbStarBlack: 5,
    nbStarGold: 0
  }
  public infoFilm: InfoFilm = {
    idFilm: -1,
    acteurs: [],
    categories: [],
    realisateurs: []
  }

  private listAllActors: Map<String, Acteur> = new Map()
  private listAllRealisators: Map<String, Realisateur> = new Map()
  private listAllCategories: Map<String, Category> = new Map()
  public listActors: string[] = []
  public listRealisators: string[] = []
  public listCategories: string[] = []
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
            this.getFirstUserComment().then((commentaire: CommentaireInfo) => {
              this.firstCommentaire = commentaire
              console.log(this.commentaires)
              console.log(this.firstCommentaire)
            })
          })
          this.fetchFilmService.getInfoFilm(this.film.idFilm).then((res: InfoFilm) => {
            this.infoFilm = res
            this.fetchFilmService.getAllActors().then((res: Acteur[]) => {
              res.forEach((a: Acteur) => {
                this.listAllActors.set(a.idActeur.toString(), a)
              })
              this.checkInfoActors().then(() => {
                this.film.acteurs = []
                this.listActors.forEach((actor: string) => {
                  this.film.acteurs.push(actor)
                })
              })
              this.fetchFilmService.getAllRealisator().then((res: Realisateur[]) => {
                res.forEach((r: Realisateur) => {
                  this.listAllRealisators.set(r.idRealisateur.toString(), r)
                })
                this.checkInfoRealisators().then(() => {
                  this.film.realisateurs = []
                  this.listRealisators.forEach((realisator: string) => {
                    this.film.realisateurs.push(realisator)
                  })
                })
              })
              this.fetchFilmService.getListCategories().then((res: Category[]) => {
                console.log(res)
                res.forEach((cat: Category) => {
                  this.listAllCategories.set(cat.idCategorie.toString(), cat)
                })
                this.checkInfoCategories().then(() => {
                  this.film.categories = []
                  this.listCategories.forEach((category: string) => {
                    this.film.categories.push(category)
                  })
                })
              })
            })
          })
        })
      }
    })
  }

  checkInfoActors(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.infoFilm.acteurs.forEach((idActor: number) => {
        let actor = this.listAllActors.get(idActor.toString())
        if(actor !== undefined) {
          this.listActors.push(actor.prenom + " " + actor.nom)
        }
      })
      resolve(null)
    })
  }

  checkInfoRealisators(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.infoFilm.realisateurs.forEach((idRealisateur: number) => {
        let realisateur = this.listAllRealisators.get(idRealisateur.toString())
        if(realisateur !== undefined) {
          this.listRealisators.push(realisateur.prenom + " " + realisateur.nom)
        }
      })
      resolve(null)
    })
  }

  checkInfoCategories(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.infoFilm.categories.forEach((idCategorie: number) => {
        console.log(idCategorie)
        let category = this.listAllCategories.get(idCategorie.toString())
        console.log(category)
        if(category !== undefined) {
          this.listCategories.push(category.nomCategorie)
        }
      })
      resolve(null)
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
      this.errorMessage = "Pour envoyer un commentaire vous devez ??tre connect?? !"
      this.printError = true
      return
    }
    if((this.firstCommentaire.idCom === -1 && this.noteComment === -1) || comment === "" || this.idFilm === null) {
      this.errorConnexion = false
      this.errorMessage = "Pour envoyer votre commentaire, vous devez ??crire un message et selectionner une note !"
      this.printError = true
      return
    }
    
    this.errorConnexion = false
    this.errorMessage = ""
    this.printError = false
    let userID = idUtilisateur
    let note = this.firstCommentaire.idCom !== -1 ? this.firstCommentaire.valeurNote : this.noteComment
    if(this.firstCommentaire.idCom !== -1 && this.noteComment !== -1){
      if(this.firstCommentaire.valeurNote === this.noteComment){
        note = this.firstCommentaire.valeurNote
      } else {
        note = this.noteComment
      }
    } else if(this.firstCommentaire.idCom === -1) {
      note = this.noteComment
    } else {
      note = this.firstCommentaire.valeurNote
    }

    let noteToSend: NoteToSend = {
      idFilm: parseInt(this.idFilm),
      valeur: note,
      idUtilisateur: parseInt(userID)
    }
    let commentToSend: CommentToSend = {
      idNote: -1,
      dateCommentaire: "",
      contenu: comment
    }
    let date = new Date()
    let month: number = date.getMonth() + 1
    let m: string = month.toString().length === 2 ? month.toString() : "0" + month.toString()
    let d: string = date.getDate().toString().length === 2 ? date.getDate().toString() : "0" + date.getDate().toString()
    let dateCom = date.getFullYear() + "-" + m + "-" + d
    
    if(this.firstCommentaire.idCom === -1){
      this.fetchFilmService.createNote(noteToSend).then((idNote: number) => {
        console.log(idNote)
        
        commentToSend.idNote = idNote
        commentToSend.dateCommentaire = dateCom
        this.fetchFilmService.createComment(commentToSend).then((res: any) => {
          window.location.reload()
          console.log(res)
        }).catch((e) => {
          console.log("Cannot create comment")
        })
      }).catch((e) => {
        console.log("Cannot create note")
      })
    } else {
      let payload: ChangeCommentary = {
        idNote: this.commentaires.idNoteUtilisateur.toString(),
        dateCommentaire: dateCom,
        contenu: commentToSend.contenu,
        valeurNote: noteToSend.valeur
      }
      
      this.fetchFilmService.modifyCommentary(this.commentaires.idCommUtilisateur, payload).then((res: any) => {
        window.location.reload()
      }).catch((e) => {
        console.log("Cannot update comment")
      })
    }
  }

  public streamingLocation(): void{
    let idUtilisateur = this.cookieService.get('UserID')
    if(idUtilisateur == undefined || idUtilisateur == "") {
      this.errorConnexion = true
      this.errorMessage = "Pour Louer ce film vous devez ??tre connect?? !"
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
        this.messageSuccess = "La location ?? bien ??t?? enregistrer."
        this.printSuccess = true
      }).catch((e) => {
        this.errorConnexion = false
        this.errorMessage = "Erreur lors de la location en streaming de ce film."
        this.printError = true
      })
    }
  }

  getFirstUserComment(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.commentaires.infosCommentaires.forEach((com: CommentaireInfo) => {
        if(com.idUtil === parseInt(this.idUtilisateur)) {
          resolve(com)
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
