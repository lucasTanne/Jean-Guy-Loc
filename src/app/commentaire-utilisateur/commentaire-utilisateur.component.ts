import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentaireUser } from 'src/types/commentaire';
import { UserPseudonyme } from 'src/types/user';
import { StarsService } from '../film/services/stars.service';
import { PrintMenuService } from '../services/print-menu.service';
import { FetchCommentUserService } from './service/fetch-comment-user.service';

@Component({
  selector: 'app-commentaire-utilisateur',
  templateUrl: './commentaire-utilisateur.component.html',
  styleUrls: ['./commentaire-utilisateur.component.css']
})
export class CommentaireUtilisateurComponent implements OnInit {
  
  
  public commentaires : CommentaireUser[] = [{
    note: 0,
    commentaire: "",
    date: new Date(1970, 1, 1),
    idFilm: -1,
    nomFilm: "",
    lienImage: "",
    gold : 0,
    black : 0
  }]


  public pseudonyme : UserPseudonyme = {
    "pseudonyme" : ""
  }
  idUser: string | null = "-1";

  constructor(private printMenuService : PrintMenuService,
              private fecthCommUser : FetchCommentUserService, 
              private activatedRoute: ActivatedRoute ,
              private starService : StarsService) { 
    this.printMenuService.setPrintMenu(true);
    this.activatedRoute.paramMap.subscribe(param => {
      this.idUser = param.get('idUser')
      if(this.idUser != null) {
        this.fecthCommUser.getPseudonyme(+this.idUser).then((pseudo: UserPseudonyme) => {
          this.pseudonyme = pseudo;
        })
          this.fecthCommUser.getComm(+this.idUser).then((res: CommentaireUser[]) => {
            res.forEach((com: CommentaireUser) => {
              let tab = this.starService.starsNumber(com.note)
              com.black = tab[0]
              com.gold = tab[1]
              console.log(tab)
            })
            this.commentaires = res
           console.log(this.commentaires)
          })
      }
    })
    
    }


  ngOnInit(): void {
   
  }
} 



