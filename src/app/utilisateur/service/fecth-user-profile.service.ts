import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userProfil } from 'src/types/user';

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



}
