export interface UserProps {
  userName: string;
  adminRole: boolean;
}

export interface AuthResponse {
  token: string;
  user: UserProps;
}
