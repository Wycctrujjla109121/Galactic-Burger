export function checkResponse(res:Response){
    return res.ok ? res.json() : res.json()
}
