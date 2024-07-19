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
  nickname: number;
  emailForm: number;
  emailUnique: number;
  pwdCharSet: number;
  pwdLength: number;
  pwdSeriesOfSameChar: number;
  confirmPassword: number;
}

interface LinkLoginProps {
  className?: string;
  onClick?: () => void;
  to: string;
  redirectAfterLogin?: string;
  children: React.ReactNode;
}

interface SignUpFieldProps {
  input: InputProps;
  validations: SignUpValidation;
}
