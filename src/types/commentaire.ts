export interface Commentaire {
    idCommentaire: number,
    idNote: number,
    contenu: string,
    dateCommentaire: Date
}

export interface CommentaireInfo {
    username: string,
    idUtilisateur: number,
    valeurNote: number,
    dateCommentaire: Date,
    contenu: string,
    idCommentaire: number,
    nbStarBlack: number,
    nbStarGold: number,
}

export interface CommentToSend {
    idNote: number,
    dateCommentaire: string,
    contenu: string
}