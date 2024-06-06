declare namespace Express {
  export interface Request {
    user: {
      id: number;
      name: string;
      email: string;
      iat: number;
      exp: number;
    };
  }
}
