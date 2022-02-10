import { Component, OnInit } from '@angular/core';
import { statsAccueil } from 'src/types/stats';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.css']
})
export class CompteurComponent {

  public statsAccueil: statsAccueil= {
    nbUser: -1,
    nbFilms: -1,
    nbFilmLoueAnnee: -1,
    nbFilmMoisDernier: -1
  }
  
  constructor(private statService : StatsService) { 

    this.statService.getStatsAccueil(2022,"02").then((list: statsAccueil) => {
      this.statsAccueil = list
    }).catch((e) => {
      
    })

  }

}
