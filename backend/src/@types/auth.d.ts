interface JwtPayload {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface JwtClaim {
  id: number;
  name: string;
  email: string;
}
