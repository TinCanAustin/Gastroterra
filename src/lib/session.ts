/* eslint-disable @typescript-eslint/no-explicit-any */
const session: { [key: string] : { content: any; expiration: number }} = {};

export function validateExpiration(expiration:number) : boolean {
    const currentTime = new Date().getTime();
    return currentTime > expiration;
}

export function validateToken(token: string) : boolean{
    if(token in session){
        return true;
    }
    return false;
}

export function getSession(token: string) {
    return session[token];
}

export function setSession(token: string, content: any, expiration: number) {
    session[token] = { content, expiration };
}

export function deleteSession(token: string) {
    delete session[token];
}