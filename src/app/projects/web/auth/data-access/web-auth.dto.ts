export interface WebSignInInput {
  email: string;
  password: string;
}

export interface WebSignInOutput {
  accessToken: string;
  expiresIn: number;
  authType: string;
}
