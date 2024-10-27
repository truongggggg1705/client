import { http } from "../util/api";

export const CommentService = {
  // Get all comments for a specific player and optional user
  getComments: (playerId: number, userId?: number) => {
    return http.get(`comment/${playerId}${userId ? `/${userId}` : ''}`); // Dynamic URL based on userId presence
  },

  // Create a new comment
  createComment: (data: { playerId: number; userId: number; message: string; rating: number }) => {
    return http.post("comment", data);
  },

  // Update a comment by ID
  updateComment: (commentId: number, message: string, rating: number) => {
    return http.put(`comment/${commentId}`, { message, rating });
  },

  // Delete a comment by ID
  deleteComment: (commentId: number) => {
    return http.delete(`comment/${commentId}`);
  }
};
