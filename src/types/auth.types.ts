export interface AuthResponceType{
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}


export interface ResponceUserType{
  success: boolean,
  user: {
    email:string,
    name: string
  }
}
