export interface ComptePayload {
    username: string,
    password: string
}
export interface UserPayload {
    access_token: string,
    idUtilisateur: string, 
    admin : boolean
}

export interface newUser {
    pseudonyme: string,
    motDePasse: string,
    adresse: string,
    nom: string,
    prenom: string,
    estAdmin: boolean
}

export interface InscriptionResult {
    pseudonyme: string,
    motDePasse: string,
    adresse: string,
    nom: string,
    prenom: string,
    estAdmin: boolean,
    idUtilisateur: number
}