import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeFilm } from 'src/types/film-item';

@Injectable({
  providedIn: 'root'
})
export class FetchGestionFilmService {

  constructor(private readonly http: HttpClient) { }

  getType(): Promise<any> {
    let url = "http://localhost:3000/typefilm"
    return this.http.get<TypeFilm[]>(url)
    .toPromise()
    .then((res: TypeFilm[]) => {
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }
}
