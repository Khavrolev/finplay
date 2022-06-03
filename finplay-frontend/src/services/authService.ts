import { AxiosResponse } from "axios";
import $api from "../http/axios";
import UserEndpoints from "../utils/enums/fetchData";
import { AuthResponse } from "../utils/interfaces/user";

export interface LoginProps {
  userName: string;
  password: string;
}

export default class AuthService {
  static async login(
    userName: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse, AxiosResponse<AuthResponse>, LoginProps>(
      UserEndpoints.Login,
      {
        userName,
        password,
      },
    );
  }

  static async logout() {
    return $api.post(UserEndpoints.Logout);
  }
}
