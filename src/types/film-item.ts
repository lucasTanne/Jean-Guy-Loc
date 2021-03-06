import { Note } from "./note";

export interface FilmItem {
    idFilm: number,
    idTypeFilm: number,
    titre: string,
    lienImage: string,
    lienBandeAnnonce: string,
    synopsis: string,
    duree: number,
    dateSortie: Date,
    notes: Note[],
    categories: string[],
    realisateurs: string[],
    acteurs: string[]
}

export interface FilmToList {
    idFilm: number,
    titre: string,
    lienImage: string,
    synopsis: string,
    moyenne: number,
    categories: number[],
    type: number
}

export interface SliceFilmToList {
    objFilm: FilmToList
}
export interface FilmCaroussel {
    idFilm: number,
    titre: string,
    lienImage: string
}

export interface TypeFilm {
    idType: number,
    nomType: string
}


export interface Film {
    idTypeFilm : number 
    titre : string
    lienImage : string
    lienBandeAnnonce : string
    synopsis : string
    duree : number
    dateSortie : string
}
export interface InfoFilm {
    idFilm: number,
    categories: number[],
    realisateurs: number[],
    acteurs: number[]
}
