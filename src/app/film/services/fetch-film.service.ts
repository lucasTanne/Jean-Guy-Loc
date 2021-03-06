import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ChangeCommentary, CommentaireInfo, CommentToSend, ListCommentaireInfo } from 'src/types/commentaire';
import { Category } from 'src/types/categories';
import { NewLocation, NewLocationStreaming } from 'src/types/disponibilites';
import { FilmItem, FilmToList, InfoFilm, SliceFilmToList } from 'src/types/film-item';
import { Note, Notes, NoteToSend } from 'src/types/note';
import { Acteur, Realisateur } from 'src/types/info';

@Injectable({
  providedIn: 'root'
})
export class FetchFilmService {

  constructor(private readonly http: HttpClient, private cookieService: CookieService) { }

  getListFilms(): Promise<any> {
    let url = "http://localhost:3000/film/"
    return this.http.get<FilmItem[]>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getListFilmsWithAverage(): Promise<any> {
    let url = "http://localhost:3000/film/listeFilms/getFilmsWithNote"
    return this.http.get<SliceFilmToList[]>(url)
    .toPromise()
    .then((res: SliceFilmToList[]) => {
      return res
    }).catch((e) => {
      console.log("catch get films with average")
      console.log(e)
      return undefined
    })
  }

  getFilm(idFilm: string): Promise<any> {
    let url = "http://localhost:3000/film/{idFilm}"
    url = url.replace("{idFilm}", idFilm)
    return this.http.get<FilmItem>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getFilmNotes(idFilm: number): Promise<any> {
    let url = "http://localhost:3000/note/{idFilm}"
    url = url.replace("{idFilm}", idFilm.toString())
    return this.http.get<Notes>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getFilmCommentaires(idFilm: number, idUtilisateur: string): Promise<any> {
    let url = "http://localhost:3000/film/commentaires/{idFilm}/{idUtilisateur}"
    url = url.replace("{idFilm}", idFilm.toString())
    url = url.replace("{idUtilisateur}", idUtilisateur)
    return this.http.get<ListCommentaireInfo>(url)
    .toPromise()
    .then((res: ListCommentaireInfo) => {
      console.log(res)
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  createNote(note: NoteToSend): Promise<any> {
    let url = "http://localhost:3000/note"
    // let token = this.cookieService.get("token")
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // return this.http.post<Note>(url, note, {headers: headers})
    return this.http.post<Note>(url, note)
    .toPromise()
    .then((res: Note) => {
      return res.idNote
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return -1
    })
  }

  getFilmsRecent(): Promise<any> {
    let url = "http://localhost:3000/film/carrousel/getFilmRecents"
    return this.http.get<any>(url)
    .toPromise()
    .then((res: any) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  createComment(comment: CommentToSend): Promise<any> {
    let url = "http://localhost:3000/commentaire"
    // let token = this.cookieService.get("token")
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // return this.http.post<any>(url, comment, {headers: headers})
    return this.http.post<any>(url, comment)
    .toPromise()
    .then((res: any) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  createStreamingLocation(loc: NewLocationStreaming): Promise<any> {
    let url = "http://localhost:3000/locationstreaming"
    let token = this.cookieService.get("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<NewLocationStreaming>(url, loc, {headers: headers})
    .toPromise()
    .then((res: any) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  modifyCommentary(idCommentaire: number, payload: ChangeCommentary): Promise<any> {
    let url = "http://localhost:3000/commentaire/{idCommentaire}"
    url = url.replace("{idCommentaire}", idCommentaire.toString())
    return this.http.put<any>(url, payload)
    .toPromise()
    .then((res: any) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getListCategories(): Promise<any> {
    let url = "http://localhost:3000/categorie/"
    return this.http.get<Category[]>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getInfoFilm(idFilm: number): Promise<any> {
    let url = "http://localhost:3000/film/getInfos/{idFilm}"
    url = url.replace("{idFilm}", idFilm.toString())
    return this.http.get<InfoFilm>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getAllActors(): Promise<any> {
    let url = "http://localhost:3000/acteur"
    return this.http.get<Acteur[]>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getAllRealisator(): Promise<any> {
    let url = "http://localhost:3000/realisateur"
    return this.http.get<Realisateur[]>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }
}
