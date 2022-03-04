export interface ComptePayload {
    username: string,
    password: string
}
export interface UserPayload {
    access_token: string,
    idUtilisateur: string, 
    admin : boolean
}