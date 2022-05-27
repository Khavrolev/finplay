import { AxiosResponse } from "axios";
import $api from "../http/axios";
import { GameDataEndpoints } from "../utils/enums/fetchData";
import {
  CreateGroup,
  GameData,
  IGroup,
  DeleteGroup,
  DeletedGroupResponse,
} from "../utils/interfaces/gameData";

export default class UserService {
  static async getGameData(): Promise<AxiosResponse<GameData>> {
    return $api.get<GameData>(GameDataEndpoints.GetData);
  }

  static async createGroup(group: CreateGroup): Promise<AxiosResponse<IGroup>> {
    return $api.post<IGroup, AxiosResponse<IGroup>, CreateGroup>(
      GameDataEndpoints.CreateGroup,
      group,
    );
  }

  static async updateGroup(group: IGroup): Promise<AxiosResponse<IGroup>> {
    return $api.put<IGroup, AxiosResponse<IGroup>, IGroup>(
      GameDataEndpoints.UpdateGroup,
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
    >(`${GameDataEndpoints.DeleteGroup}?id=${deletingGroupId}`, {
      data: { movingGroupId },
    });
  }
}
