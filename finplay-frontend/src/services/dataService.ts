import $api from "../http/axios";

export default class UserService {
  static fetchData() {
    return $api.get("");
  }
}
