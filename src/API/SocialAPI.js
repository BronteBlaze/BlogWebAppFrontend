import API from ".";

export const GetAllCommentsAPI = (blog_id) =>
  API.get(`/api/comments/${blog_id}`);

export const PostCommentAPI = (blog_id, content) =>
  API.post(`/api/comments/${blog_id}`, { content });

export const DeleteCommentAPI = (id) => API.delete(`/api/comments/${id}`);

export const LikeBlogAPI = (blog_id) => API.post(`/api/likes/${blog_id}`);

export const GetLikesAPI = (blog_id) => API.get(`/api/likes/${blog_id}`);