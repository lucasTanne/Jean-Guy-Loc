import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disponibilite, NewLocation } from 'src/types/disponibilites';

@Injectable({
  providedIn: 'root'
})
export class FetchDisponibilitesService {

  constructor(private readonly http: HttpClient) { }

  getDispoOfFilm(idFilm: number): Promise<any> {
    let url = "http://localhost:3000/locationphysique/dispo/{idFilm}"
    url = url.replace("{idFilm}", idFilm.toString())
    return this.http.get<Disponibilite[]>(url)
    .toPromise()
    .then((res: Disponibilite[]) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  createPhysicalLocation(loc: NewLocation): Promise<any> {
    let url = "http://localhost:3000/locationphysique"
    return this.http.post<NewLocation>(url, loc)
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
