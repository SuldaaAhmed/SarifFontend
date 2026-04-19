// lib/users.ts
import api from "./api";


// New Interface for Team Members
export interface TeamMemberRequest {
  id?: string;
  title: string;
  description: string;
  status: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
  coverImage?: File | null; // Used for the upload
}


export const UsersService = {
// @/lib/users.ts dhexdiisa ku bedel kan:
getAll(page: number = 1, pageSize: number = 10, search: string = "") {
  return api.get(`/Users/get-users?page=${page}&pageSize=${pageSize}&search=${search}`);
},
  getById(id: string) {
    return api.get(`/User/${id}`);
  },

  create(data: any) {    
    //console.log("Creating user with data:", data);
    return api.post("/Users/Create-user", data);
  },


   createRole(data: any) {
    return api.post("/UserRoles/create-role", data);
  },


 RoleAll() {
    return api.get("/UserRoles/all-roles");
  },


   getRoles() {
    return api.get("/Users/roles");
  },

  



    // ✅ ADD THIS: Update Role
  updateRole(data: {
    roleId: string;
    name: string;
    description?: string;
  }) {
    return api.put("/Users/update-role", data);
  },


    deleteRole(id: string) {
    return api.delete(`/Users/delete-role/${id}`);
  },

// Update your service definition to this:
update(id: string, data: any) {

  return api.put(`/Users/update-user/${id}`, data);
},

  delete(id: string) {
    return api.delete(`/Users/delete-user/${id}`);
  },




  // --- TEAM MEMBERS (Multipart/Form-Data) ---
  
  createTeamMember(data: TeamMemberRequest) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status);
    if (data.linkedin) formData.append("linkedin", data.linkedin);
    if (data.facebook) formData.append("facebook", data.facebook);
    if (data.website) formData.append("website", data.website);
    if (data.coverImage) formData.append("coverImage", data.coverImage);

    return api.post("/Auth/create-member", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAllTeamMembers(page: number = 1, pageSize: number = 10) {
    return api.get(`/Auth/get-members?page=${page}&pageSize=${pageSize}`);
  },

  updateTeamMember(id: string, data: TeamMemberRequest) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status);
    if (data.linkedin) formData.append("linkedin", data.linkedin);
    if (data.facebook) formData.append("facebook", data.facebook);
    if (data.website) formData.append("website", data.website);
  if (data.coverImage instanceof File) {
    formData.append("coverImage", data.coverImage);
  }
  // -
    return api.put(`/Auth/update-member/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteTeamMember(id: string) {
    return api.delete(`/Auth/delete-member/${id}`);
  },









};
