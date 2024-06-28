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
