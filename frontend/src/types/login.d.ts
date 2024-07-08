interface ResLogin {
  message: string;
  id: number;
  name: string;
  email: string;
  nickname: string;
  access_token: string;
}

interface ProtecedRouteProps {
  children: React.ReactNode;
}

interface SignUpValidation {
  // username: number;
  nickname: number;
  email: number;
  pwdCharSet: number;
  pwdLength: number;
  pwdSeriesOfSameChar: number;
  confirmPassword: number;
}
