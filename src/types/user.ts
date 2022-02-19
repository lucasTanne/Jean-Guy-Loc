export interface userProfil {
    pseudonyme: string,
    motDePasse: string,
    adresse:string,
    nom: string,
    prenom: string
}

export interface putUserInfo {
    adresse:string,
    nom: string,
    prenom: string
}

export interface putUserPass {
    pseudonyme: string,
    motDePasse: string,
}

export interface FilmsSPLoue {
    filmsPhysique: {
        LocPhysiqueNow : FilmLouePhysique[],
        LocPhysiqueOlder: FilmLouePhysique[],
        LocPhysiqueCome : FilmLouePhysique[]
    },
    filmsStreaming: {
        LocStreamingNow : FilmLoueStreaming[],
        LocStreamingOlder : FilmLoueStreaming[],
        LocStreamingCome : FilmLoueStreaming[]
    }
}

export interface FilmLouePhysique {
    idLocationFilm:number ,
    dateDeLocation: Date,
    duree:number,
    idUtilisateur:number ,
    idFilm: number,
    estRendu : boolean,
    affiche: string,
    titre : string
}

export interface FilmLoueStreaming{
    idLocationStreaming:number ,
    dateDeLocation: Date ,
    duree:number ,
    idUtilisateur:number ,
    idFilm: number,
    affiche : string,
    titre : string
}

