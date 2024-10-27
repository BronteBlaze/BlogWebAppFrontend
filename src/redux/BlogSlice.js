import { createSlice } from "@reduxjs/toolkit";
import * as api from "@/API/BlogAPI";
import { toast } from "react-toastify";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const BlogSlice = createSlice({
  name: "Blog",
  initialState: {
    blogStatus: STATE.idle,
    allBlogs: [],
    categoryBlogs: [],
    categoryDetails: {
      last_page: null,
    },
    categoryName: "",
    blogDetails: {},
    yourBlogs: [],
    blogEditMode: { blogId: null, editMode: false },
    allBlogsDetails: {
      last_page: null,
    },
    monthBlogs: [],
    monthDetails: {
      last_page: null,
    },
    monthInfo: { monthName: "", monthNumber: null },
  },
  reducers: {
    setBlogStatus(state, action) {
      state.blogStatus = action.payload;
    },
    setAllBlogs(state, action) {
      state.allBlogs = action.payload;
    },
    setCategoryBlogs(state, action) {
      state.categoryBlogs = action.payload;
    },
    addBlog(state, action) {
      state.allBlogs = [...state.allBlogs, action.payload];
    },
    setBlogDetails(state, action) {
      state.blogDetails = action.payload.details;
    },
    setYourBlogs(state, action) {
      state.yourBlogs = action.payload;
    },
    setBlogEditMode(state, action) {
      const { blogId, editMode } = action.payload;
      state.blogEditMode = { blogId: blogId, editMode: editMode };
    },
    setAllBlogsDetails(state, action) {
      state.allBlogsDetails = action.payload;
    },
    setCategoryDetails(state, action) {
      state.categoryDetails = action.payload;
    },
    setMonthBlogs(state, action) {
      state.monthBlogs = action.payload;
    },
    setMonthDetails(state, action) {
      state.monthDetails = action.payload;
    },
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    setMonthInfo(state, action) {
      const { monthName, monthNumber } = action.payload;
      state.monthInfo = { monthName, monthNumber };
    },
    deleteABlog(state, action) {
      state.allBlogs = state.allBlogs?.filter((blog) => {
        return blog.id !== action.payload.id;
      });
    },
  },
});

export const obtainAllBlogs = (pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const { data } = await api.GetAllBlogsAPI(pageNumber);
      const { data: blogData } = data;
      if (data) {
        dispatch(
          setAllBlogsDetails({
            last_page: data.last_page,
          })
        );
      }
      if (blogData) {
        dispatch(setAllBlogs(blogData));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const obtainCategoryBlogs = (pageNumber, categoryName) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blogs },
      } = await api.GetCategoryBlogsAPI(pageNumber, categoryName);
      const { data: blogData } = blogs;
      if (blogs) {
        dispatch(
          setCategoryDetails({
            last_page: blogs.last_page,
          })
        );
      }
      if (blogData) {
        dispatch(setCategoryBlogs(blogData));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const obtainMonthBlogs = (pageNumber, monthNumber) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blogs },
      } = await api.GetMonthBlogsAPI(pageNumber, monthNumber);
      const { data: blogData } = blogs;
      if (blogs) {
        dispatch(
          setMonthDetails({
            last_page: blogs.last_page,
          })
        );
      }
      if (blogData) {
        dispatch(setMonthBlogs(blogData));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const postBlog = (blogData) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blog },
      } = await api.PostBlogAPI(blogData);
      if (blog) {
        dispatch(addBlog(blog));
        toast("Your blog is posted!");
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const getBlogDetails = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blog },
      } = await api.GetBlogDetailsAPI(blogId);
      if (blog) {
        dispatch(setBlogDetails({ details: blog }));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      // toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const updateBlog = (blogData, blogId) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blog },
      } = await api.UpdateBlogAPI(blogData, blogId);
      dispatch(setBlogStatus(STATE.idle));
      toast("Your blog is updated!");
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const userBlogs = (yourCurrentPage) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { blogs },
      } = await api.GetYourBlogsAPI(yourCurrentPage);
      if (blogs) {
        dispatch(setYourBlogs(blogs));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogStatus(STATE.loading));
      const {
        data: { message },
      } = await api.DeleteBlogAPI(blogId);
      if (message) {
        toast("Your blog is deleted!");
        dispatch(deleteABlog({ id: blogId }));
      }
      dispatch(setBlogStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setBlogStatus(STATE.failed));
    }
  };
};

export const {
  setAllBlogs,
  setBlogStatus,
  addBlog,
  setBlogDetails,
  setBlogEditMode,
  setYourBlogs,
  setAllBlogsDetails,
  setCategoryBlogs,
  setCategoryDetails,
  setCategoryName,
  setMonthBlogs,
  setMonthInfo,
  setMonthDetails,
} = BlogSlice.actions;

export const getAllBlogs = (state) => state.Blog.allBlogs;
export const getCategoryBlogs = (state) => state.Blog.categoryBlogs;
export const getBlogStatus = (state) => state.Blog.blogStatus;
export const getDetails = (state) => state.Blog.blogDetails;
export const getYourBlogs = (state) => state.Blog.yourBlogs;
export const getBlogEditMode = (state) => state.Blog.blogEditMode;
export const getAllBlogsDetails = (state) => state.Blog.allBlogsDetails;
export const getCategoryName = (state) => state.Blog.categoryName;
export const getCategoryDetails = (state) => state.Blog.categoryDetails;
export const getMonthDetails = (state) => state.Blog.monthDetails;
export const getMonthBlogs = (state) => state.Blog.monthBlogs;
export const getMonthInfo = (state) => state.Blog.monthInfo;

export default BlogSlice.reducer;
