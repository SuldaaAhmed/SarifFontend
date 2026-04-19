// lib/utils.ts
import api from "./api";

export interface CreateStudentRequest {
  userId: string;
}

export interface UpdateStudentRequest {
  id: string;
  isActive: boolean;
}

export interface AssignStudentCourseTypesRequest {
  studentId: string;
  courseTypeIds: string[];
}

export const StudentService = {


getStudents: async (page = 1, pageSize = 10) => {
    return api.get("/Student/get-students", {
      params: { page, pageSize },
    });
  },

  // Enroll course (Guid StudentId, Guid CourseId)
  enrollCourse: async (data: { studentId: string; courseId: string }) => {
    return api.post("/Student/enroll-course", data);
  },

  

  // Assign course types (Guid StudentId, List<Guid> CourseTypeIds)
  assignCourseTypes: async (data: { studentId: string; courseTypeIds: string[] }) => {
    return api.post("/Student/assign-course-types", data);
  },
// Delete student
  deleteStudent: async (id: string) => {
    return api.delete(`/Student/delete-student/${id}`);
  } ,


    createStudent: async (data: CreateStudentRequest) => {
    return api.post("/Student/create-student", data);
  },

  updateStudent: async (data: UpdateStudentRequest) => {
    return api.put("/Student/update-student", data);
  },

// NEW: Gets types specific to the course the student is taking
  getCourseTypesByCourseId: async (courseId: string) => {
    return api.get(`/Course/get-course-types/${courseId}`);
  }


  

 
};
