import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmItem } from 'src/types/film-item';
import { Notes } from 'src/types/note';

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
    let url = "http://localhost:3000/notes/{idFilm}"
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
}
