// lib/utils.ts
import api from "./api";

export interface ContactRequestDto {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export const UtilityService = {

      createContactRequest(data: ContactRequestDto) {
        return api.post("/Users/Create-contact", data);
  },

  // Get All (with Pagination)
  getAllContactRequests(page: number = 1, pageSize: number = 10) {
    return api.get(`/Users/get-contact-request?page=${page}&pageSize=${pageSize}`);
  },

  // Update
  updateContactRequest(id: string, data: ContactRequestDto) {
    return api.put(`/Users/update-contact-request/${id}`, data);
  },


  // Delete 
  deleteContactRequest(id: string) {
    return api.delete(`/Users/delete-contact/${id}`);
  },
 
};
