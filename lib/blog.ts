import api from "./api";

// --- 1. SHARED INTERFACES ---

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  categoryId: string;
  categoryName: string;
  authorId: string;
  authorName: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  blogId: string;
  content: string;
  parentId?: string | null;
  authorName: string;
  authorInitials: string;
  createdAt: string;
  likesCount: number;
  replies: BlogComment[];
}

// Unified Request Interface to prevent type mismatches in the Table component
export interface BlogRequest {
  title: string;
  content: string;
  categoryId: string;
  imageUrl: File | string | null; 
  isPublished?: boolean;
  isFeatured?: boolean;
}

export interface PaginatedResponse<T> {
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    items: T[];
  };
  success: boolean;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// --- 2. THE SERVICE ---

export const BlogService = {
  // Fetch all blogs with pagination
  getBlogs(page = 1, pageSize = 10) {
    return api.get<PaginatedResponse<BlogItem>>("/blog/get-blogs", {
      params: { page, pageSize },
    });
  },

  // Fetch a single blog by ID
  getBlogDetails(id: string) {
    return api.get<{ data: BlogItem; success: boolean }>(`/blog/detail-blog/${id}`);
  },

  // CREATE: Logic for saving a new article with an image
  async createBlog(data: BlogRequest) {
    const formData = new FormData();
    
    formData.append("Title", data.title);
    formData.append("Content", data.content);
    formData.append("CategoryId", data.categoryId);
    
    // Append File if it exists
    if (data.imageUrl instanceof File) {
      formData.append("ImageUrl", data.imageUrl); 
    }

    formData.append("IsPublished", String(data.isPublished ?? true));
    formData.append("IsFeatured", String(data.isFeatured ?? false));
    
    return api.post("/blog/create-blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // UPDATE: Logic for saving changes to an existing article
  async updateBlog(id: string, data: BlogRequest) {
    const formData = new FormData();
    
    formData.append("Title", data.title);
    formData.append("Content", data.content);
    formData.append("CategoryId", data.categoryId);
    
    // Only append "ImageUrl" if the user actually uploaded a NEW file.
    // If it's a string, the backend already has the path.
    if (data.imageUrl instanceof File) {
      formData.append("ImageUrl", data.imageUrl);
    }

    formData.append("IsPublished", String(data.isPublished ?? false));
    formData.append("IsFeatured", String(data.isFeatured ?? false));

    return api.put(`/blog/update-blog/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // DELETE: Remove an article
  deleteBlog: async (id: string) => {
    return api.delete(`/blog/delete-blog/${id}`);
  },

  // --- CATEGORIES ---
  getAllCategory: async (page = 1, pageSize = 10) => {
    return api.get("/blog/get-categories", {
      params: { page, pageSize },
    });
  },

  // --- COMMENTS & INTERACTION ---
  async createComment(data: { blogId?: string; content: string; parentId?: string | null }) {
    return api.post<ApiResponse<BlogComment>>("/blog/create-comment", data);
  },


  async deleteComment(id: string) {
    return api.delete<ApiResponse<boolean>>(`/blog/delete-comment/${id}`);
  },

  // Ensure this is also present if you use it for replies/comments


  async toggleLike(blogId: string) {
    return api.post<ApiResponse<{ likesCount: number; isLiked: boolean }>>(
      "/blog/toggle-like", 
      { blogId }
    );
  },
};