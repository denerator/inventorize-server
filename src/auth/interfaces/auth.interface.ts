export interface IJWTPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
