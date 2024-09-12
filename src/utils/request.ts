import { checkResponse } from "./check-response";

export function request(url: string, options:RequestInit): Promise<any>{
    return fetch(url, options).then(checkResponse)
}
