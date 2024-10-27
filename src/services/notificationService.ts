import { http } from "../util/api";

export const NotificationService = {
  getAllNotifications: () => {
    return http.get("notification");
  },

  createNotification: (data: {
    title: string;
    message: string;
    userId: number;
    status?: number;
  }) => {
    return http.post("notification/create", data);
  },

  markNotificationAsRead: (id: number,status:number) => {
    return http.patch(`notification/${id}`, {status: status});
  },

  // Delete a notification
  deleteNotification: (id: number) => {
    return http.delete(`notification/${id}`);
  }
};
