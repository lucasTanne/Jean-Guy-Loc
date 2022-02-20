export interface Commentaire {
    idCommentaire: number,
    idNote: number,
    contenu: string,
    dateCommentaire: Date
}

export interface ListCommentaireInfo {
    infosCommentaires: CommentaireInfo[],
    nbNotes: number,
    nbCommentaires: number
}

export interface CommentaireInfo {
    username: string,
    idUtil: number,
    valeurNote: number,
    dateCom: Date,
    textCom: string,
    idCom: number,
    nbStarBlack: number,
    nbStarGold: number,
}

export interface CommentToSend {
    idNote: number,
    dateCommentaire: string,
    contenu: string
}

export interface CommentaireUser {
    note: number,
    commentaire: string,
    date: Date,
    idFilm: number,
    nomFilm: string,
    lienImage: string,
    gold : number,
    black : number
}