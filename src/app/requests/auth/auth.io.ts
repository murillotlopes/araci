

export interface AuthLoginInput {
  email: string
  password: string
}

export interface AuthLoginOutput {
  accessToken: string,
  expiresIn: number,
  authType: 'Bearer Token'
  // menu: Menu[]
}