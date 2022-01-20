export interface Commentaire {
    idCommentaire: number,
    idNote: number,
    contenu: string,
    dateCommentaire: Date
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