import { AxiosResponse } from "axios";
import $api from "../http/axios";
import { GameData } from "../utils/interfaces/gameData";

export default class UserService {
  static getGameData(): Promise<AxiosResponse<GameData>> {
    return $api.get<GameData>("/data");
  }
}
