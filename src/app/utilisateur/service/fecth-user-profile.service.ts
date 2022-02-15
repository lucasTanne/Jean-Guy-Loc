import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { putUserInfo, putUserPass, userProfil } from 'src/types/user';

@Injectable({
  providedIn: 'root'
})
export class FecthUserProfileService {

  constructor(private readonly http: HttpClient) { }


  getCurrentUser(id:number): Promise<any> {
    let url = "http://localhost:3000/utilisateur/{id}"
    url = url.replace("{id}", id.toString());
    return this.http.get<userProfil>(url)
    .toPromise()
    .then((res) => {
      return res
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }

  
  updateInfoUser(user: putUserInfo, id : number): Promise<any> {
    let url = "http://localhost:3000/utilisateur/{id}"
    url = url.replace("{id}", id.toString());
    // let token = this.cookieService.get("token")
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // return this.http.post<Note>(url, note, {headers: headers})
    return this.http.put<putUserInfo>(url, user)
    .toPromise()
    .then((res: putUserInfo) => {
      return res;
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return -1
    })
  }

  updateInfoPass(user: putUserPass, id : number): Promise<any> {
    let url = "http://localhost:3000/utilisateur/{id}"
    url = url.replace("{id}", id.toString());
    // let token = this.cookieService.get("token")
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // return this.http.post<Note>(url, note, {headers: headers})
    return this.http.put<putUserPass>(url, user)
    .toPromise()
    .then((res: putUserPass) => {
      return res;
    }).catch((e) => {
      console.log("catch")
      console.log(e)
      return -1
    })
  }

}
