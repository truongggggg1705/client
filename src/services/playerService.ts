import { http } from "../util/api";

export const PlayerService = {
  getPlayers: (gameId?: number) => {
    return http.get(`player/${gameId}`);
  },
  getPlayersClient: (gameId?: number) => {
    return http.get(`player/get-player-client/${gameId}`);
  },
  getPlayerData: () => {
    return http.get(`player/get-player`);
  },
  getPlayerById: (playerId?: number) => {
    return http.get(`player/get/${playerId}`);
  },
  createPlayer: (data: any) => {
    return http.post("player/add-player", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  createPlayerUser: (data: any) => {
    return http.post("player/add-player-user", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updatePlayer: (id: number, data: any) => {
    return http.put(`player/update-player/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' } // Adjust based on your API needs
    });
  },
  deletePlayer: (id: number) => {
    return http.delete(`player/delete-player/${id}`);
  },

  updateStatusPlayer: (id: number, status: number) => {
    return http.patch(`player/update-status/${id}`, { status });
  }
};
