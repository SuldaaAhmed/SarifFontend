// lib/auth.service.ts
import api from "./api";

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
export interface GoogleLoginRequest {
  idToken: string;
}


export interface CreateTeamMemberRequest {
  id?: string;  // Optional for create, required for update
  title: string;
  status?: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
  description: string;
  coverImage: File;  // For multipart/form-data
}

export const AuthService = {
  

  // LOGIN
  login(data: LoginRequest) {
    return api.post("/auth/login", data);
  },

    // GOOGLE LOGIN
  googleLogin(data: GoogleLoginRequest) {
    return api.post("/auth/google-login", data);
  },

  // LOGOUT
  logout() {
    return api.post("/auth/logout");
  },



   createTeamMember(data: CreateTeamMemberRequest) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("status", data.status || "");
    formData.append("linkedin", data.linkedin || "");
    formData.append("facebook", data.facebook || "");
    formData.append("website", data.website || "");
    formData.append("description", data.description);
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    return api.post("/auth/create-member", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
