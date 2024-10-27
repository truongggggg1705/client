import { http } from "../util/api";

export const ChatService = {
  // Lấy tất cả tin nhắn chat của người dùng
  getChats: (playerId:number,userId:number) => {
    return http.get(`chat/${playerId}/${userId}`); // Assuming the base URL is `/api/chats`
  },

  // Tạo tin nhắn chat mới
  createChat: (data: { playerId: number; userId: number; message: string,senderType:string }) => {
    return http.post("chat", data);
  },

  // Cập nhật tin nhắn chat theo ID
  updateChat: (chatId: number, message: string) => {
    return http.put(`chat/${chatId}`, { message });
  },

  // Xóa tin nhắn chat theo ID
  deleteChat: (chatId: number) => {
    return http.delete(`chat/${chatId}`);
  }
};
