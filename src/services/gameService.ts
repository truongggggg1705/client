import { http } from "../util/api";

export const GameService = {
  getGames: () => {
    return http.get("game");
  },
  createGame: (data: any) => {
    return http.post("game/add-game", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateGame: (id: number, data: { title?: string; image?: string }) => {
    return http.put(`game/update-game/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }); 
  },
  deleteGame: (id: number) => {
    return http.delete(`game/delete-game/${id}`); 
  },
};
