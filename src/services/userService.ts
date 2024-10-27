import { http } from "../util/api";

export const UserService = {
  getUser: () => {
    return http.get("user");
  },
  getAllUser: () => {
    return http.get("user/get-all");
  },
  updateUserByAdmin: (id:number,data?:{
    fullName?: string,
    status?: number,
  }) => {
    return http.patch(`user/update-by-admin/${id}`,data)
  }
}
