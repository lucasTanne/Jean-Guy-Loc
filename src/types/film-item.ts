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
    moyenne: number
}
export interface FilmCaroussel {
    idFilm: number,
    titre: string,
    lienImage: string
}