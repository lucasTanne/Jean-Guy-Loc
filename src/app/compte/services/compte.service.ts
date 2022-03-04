import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ComptePayload, UserPayload } from 'src/types/compte';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private readonly http: HttpClient, private cookieService: CookieService) { }

  connexion(payload: ComptePayload): Promise<any> {
    let url = "http://localhost:3000/auth/login"
    return this.http.post<UserPayload>(url, payload)
    .toPromise()
    .then((res: UserPayload) => {
      this.cookieService.set('UserID', res.idUtilisateur)
      this.cookieService.set('token', res.access_token)
      this.cookieService.set('admin', JSON.stringify({admin : res.admin}))
      return res.idUtilisateur
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }
}
