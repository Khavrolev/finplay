import { AxiosResponse } from "axios";
import $api from "../http/axios";
import { AuthResponse } from "../utils/interfaces";

export default class AuthService {
  static async login(
    userName: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { userName, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
