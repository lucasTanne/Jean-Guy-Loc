export interface Disponibilite {
    start: Date,
    end: Date,
    dispo: boolean
}

export interface NewLocation {
    dateDeLocation: Date,
    duree: number,
    idUtilisateur: number,
    idFilm: number
}

export interface NewLocationStreaming {
    dateDeLocation: string,
    duree: number,
    idUtilisateur: number,
    idFilm: number
}