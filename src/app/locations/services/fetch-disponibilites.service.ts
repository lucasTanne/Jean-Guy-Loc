import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Disponibilite, NewLocation } from 'src/types/disponibilites';

@Injectable({
  providedIn: 'root'
})
export class FetchDisponibilitesService {

  constructor(private readonly http: HttpClient, private cookieService: CookieService) { }

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
    let token = this.cookieService.get("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<NewLocation>(url, loc, {headers: headers})
    .toPromise()
    .then((res: any) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      throw new Error('Uncaught Exception!')
    })
  }
}
