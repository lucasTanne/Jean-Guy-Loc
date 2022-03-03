import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FilmLouePhysique, FilmLoueRendu, UserList } from 'src/types/user';

@Injectable({
  providedIn: 'root'
})
export class FetchRenduService {

  constructor(private readonly http: HttpClient, private cookieService: CookieService) { }

  getUsers(): Promise<any> {
    let url = "http://localhost:3000/utilisateur"
    return this.http.get<UserList[]>(url)
    .toPromise()
    .then((res: UserList[]) => {
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  getFilmsRentNow(id : number): Promise<any> {
    let url = "http://localhost:3000/locationphysique/rendu/getFilmsLoueNow/{id}"
    url = url.replace("{id}", id.toString())
    return this.http.get<FilmLouePhysique[]>(url)
    .toPromise()
    .then((res: FilmLouePhysique[]) => {
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  updateRenduFilm(film: FilmLoueRendu, id : number): Promise<any> {
    let url = "http://localhost:3000/locationphysique/{id}"
    url = url.replace("{id}", id.toString());
    let token = this.cookieService.get("token")
    console.log(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<FilmLoueRendu>(url, film, {headers: headers})
    .toPromise()
    .then((res: FilmLoueRendu) => {
      return res;
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return -1
    })
  }

}
