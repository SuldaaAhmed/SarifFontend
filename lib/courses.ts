// lib/courses.service.ts
import api from "./api";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  level: string;
  price: number;
  durationInMonths: number;
  coverImageUrl: string;
  isActive: boolean;
}

export interface CreateStudentRequest {
  userId: string;
}

// Data for Creating a request
export interface CreateCourseRequestData {
  courseId: string;
  courseTypeId: string;
  discountAmount: number;
  paidAmount: number;
  type?: string;
}

// Data for Updating a request (Matches your UpdateCourseRequest DTO)
export interface UpdateCourseRequestData extends CreateCourseRequestData {
  id: string;
  coursePrice: number;
}

export const CoursesService = {
  // --- COURSE METADATA ---
  
  getAllCoursesSummary(pageNumber = 1, pageSize = 10) {
    return api.get("/Course/get-courses-summery", {
      params: { pageNumber, pageSize },
    });
  },

  getCourseTypes: async (courseId: string) => {
    return api.get(`/Course/get-course-types/${courseId}`);
  },

  // --- COURSE REQUESTS (CRUD) ---

  // GET: /Course/get-courses-request
  getAllRequests: async (page = 1, pageSize = 10) => {
    return api.get("/Course/get-courses-request", {
      params: { page, pageSize },
    });
  },

  // POST: /Course/create-Course-request
  createRequest: async (data: CreateCourseRequestData) => {
    return api.post("/Course/create-Course-request", data);
  },

  // PUT: /Course/update-course-request/{id}
  updateRequest: async (id: string, data: UpdateCourseRequestData) => {
    return api.put(`/Course/update-course-request/${id}`, data);
  },

  // DELETE: /Course/delete-request-course/{id}
  deleteRequest: async (id: string) => {
    return api.delete(`/Course/delete-request-course/${id}`);
  },


  assignUserToStudent: async (data: CreateStudentRequest) => {
    return api.post("/Student/create-student", data);
  },
};