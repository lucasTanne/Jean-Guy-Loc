import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentaireInfo, CommentToSend, ListCommentaireInfo } from 'src/types/commentaire';
import { NewLocation, NewLocationStreaming } from 'src/types/disponibilites';
import { FilmItem, FilmToList } from 'src/types/film-item';
import { Note, Notes, NoteToSend } from 'src/types/note';

@Injectable({
  providedIn: 'root'
})
export class FetchFilmService {

  constructor(private readonly http: HttpClient) { }

  getListFilms(): Promise<any> {
    let url = "http://localhost:3000/film"
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
    return this.http.get<FilmToList[]>(url)
    .toPromise()
    .then((res: FilmToList[]) => {
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

  getFilmCommentaires(idFilm: number): Promise<any> {
    let url = "http://localhost:3000/film/commentaires/{idFilm}"
    url = url.replace("{idFilm}", idFilm.toString())
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

  createComment(comment: CommentToSend): Promise<any> {
    let url = "http://localhost:3000/commentaire"
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
    return this.http.post<NewLocationStreaming>(url, loc)
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
}
