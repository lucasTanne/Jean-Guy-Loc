export interface Notes {
    notes: Note[]
}

export interface Note {
    idNote: number,
    idFilm: number,
    idUtilisateur: number,
    valeur: number
}

export interface NoteToSend {
    idFilm: number,
    valeur: number,
    idUtilisateur: number
}