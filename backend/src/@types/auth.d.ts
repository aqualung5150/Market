interface JwtClaim {
  id: number;
  email: string;
  role: string;
}

interface JwtPayload extends JwtClaim {
  exp: number;
  iat: number;
}

interface ReqCookies {
  access_token: string;
  refresh_token: string;
}
