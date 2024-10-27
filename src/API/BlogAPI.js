import API from ".";

export const GetAllBlogsAPI = (pageNumber) =>
  API.get("/api/blogs", { params: { page: pageNumber } });

export const PostBlogAPI = (blogData) => API.post("/api/blogs", blogData);

export const UpdateBlogAPI = (blogData, blogId) =>
  API.post(`/api/blogs/${blogId}`, blogData);

export const GetBlogDetailsAPI = (blogId) => API.get(`/api/blog/${blogId}`);

export const GetYourBlogsAPI = (yourCurrentPage) =>
  API.get("/api/your-blogs", { params: { page: yourCurrentPage } });

export const GetCategoryBlogsAPI = (pageNumber, category) =>
  API.get(`/api/blogs/category/${category}`, {
    params: { page: pageNumber },
  });

export const DeleteBlogAPI = (blogId) => API.delete(`/api/blogs/${blogId}`);

export const GetMonthBlogsAPI = (pageNumber, month) =>
  API.get(`/api/blogs/months/${month}`, {
    params: { page: pageNumber },
  });
