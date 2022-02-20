import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentaireUser } from 'src/types/commentaire';
import { UserPseudonyme } from 'src/types/user';


@Injectable({
  providedIn: 'root'
})
export class FetchCommentUserService {

  constructor(private readonly http: HttpClient) { }

  getPseudonyme(idUser: number): Promise<any> {
    let url = "http://localhost:3000/utilisateur/commentaire/getPseudo/{idUser}"
    url = url.replace("{idUser}", idUser.toString())
    return this.http.get<UserPseudonyme>(url)
    .toPromise()
    .then((res: UserPseudonyme) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }


  getComm(idUser: number): Promise<any> {
    let url = "http://localhost:3000/commentaire/getCommentaireByUser/{idUser}"
    url = url.replace("{idUser}", idUser.toString())
    return this.http.get<CommentaireUser[]>(url)
    .toPromise()
    .then((res: CommentaireUser[]) => {
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("catch")
      console.log(e)
      return undefined
    })
  }


}
