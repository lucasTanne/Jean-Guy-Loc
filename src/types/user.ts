export interface userProfil {
    pseudonyme: string,
    motDePasse: string,
    adresse:string,
    nom: string,
    prenom: string
}

export interface putUserInfo {
    adresse:string,
    nom: string,
    prenom: string
}

export interface putUserPass {
    pseudonyme: string,
    motDePasse: string,
}

