import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { statsAccueil } from 'src/types/stats';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private readonly http: HttpClient) { }

  getStatsAccueil(annee: number, mois: string): Promise<any> {
    let url = "http://localhost:3000/stats/{annee}/{mois}"
    url = url.replace("{annee}", annee.toString())
    url = url.replace("{mois}", mois);
    return this.http.get<statsAccueil>(url)
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
