export interface FilmItem {
    idFilm: number,
    idTypeFilm: number,
    titre: string,
    lienImage: string,
    lienBandeAnnonce: string,
    synopsis: string,
    duree: number,
    dateSortie: Date,
    notes: number[],
    categories: string[],
    realisateurs: string[],
    acteurs: string[]
}