export interface IUser {
  userName: string;
  adminRole: boolean;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}
