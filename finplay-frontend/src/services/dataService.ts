import { AxiosResponse } from "axios";
import $api from "../http/axios";
import GameDataEndpoint from "../utils/constants/fetchData";
import {
  CreateGroup,
  GameData,
  GroupProps,
  DeleteGroup,
  DeletedGroupResponse,
} from "../utils/interfaces/gameData";

export default class DataService {
  static async getGameData(): Promise<AxiosResponse<GameData>> {
    return $api.get<GameData>(GameDataEndpoint);
  }

  static async createGroup(
    group: CreateGroup,
  ): Promise<AxiosResponse<GroupProps>> {
    return $api.post<GroupProps, AxiosResponse<GroupProps>, CreateGroup>(
      GameDataEndpoint,
      group,
    );
  }

  static async updateGroup(
    group: GroupProps,
  ): Promise<AxiosResponse<GroupProps>> {
    return $api.put<GroupProps, AxiosResponse<GroupProps>, GroupProps>(
      GameDataEndpoint,
      group,
    );
  }

  static async deleteGroup(
    deletingGroupId: number,
    movingGroupId: number,
  ): Promise<AxiosResponse<DeletedGroupResponse>> {
    return $api.delete<
      DeletedGroupResponse,
      AxiosResponse<DeletedGroupResponse>,
      DeleteGroup
    >(`${GameDataEndpoint}?id=${deletingGroupId}`, {
      data: { movingGroupId },
    });
  }
}
