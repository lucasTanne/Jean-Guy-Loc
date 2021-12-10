export interface FilmInfo {
    id: number,
    image: string,
    titre: string,
    synopsys: string,
    duree: string,
    dateSortie: Date,
    categories: string[],
    realisateurs: string[],
    acteurs: string[],
    note: number
}