import { http } from "../util/api";

export const RentalRequestService = {
  getRentalRequests: () => {
    return http.get("rental-request");
  },
  
  getRentalRequestByIdPlayer: (id:number) => {
    return http.get(`rental-request/player/${id}`);
  },
  getRentalRequestByIdPlayerAll: (id:number) => {
    return http.get(`rental-request/player-all/${id}`);
  },

  createRentalRequest: (data: any) => {
    return http.post("rental-request/add-rental-request", data);
  },
  
  updateRentalRequest: (id: number, data: { status?: number; note?: string }) => {
    return http.put(`rental-request/update-rental-request/${id}`, data);
  },
  
  deleteRentalRequest: (id: number) => {
    return http.delete(`rental-request/delete-rental-request/${id}`);
  },
};
