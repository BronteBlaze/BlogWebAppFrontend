import { createSlice } from "@reduxjs/toolkit";
import * as api from "@/API/SocialAPI";
import { toast } from "react-toastify";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const SocialSlice = createSlice({
  name: "Social",
  initialState: {
    comments: [],
    socialStatus: STATE.idle,
    deleteStatus: STATE.idle,
    postStatus: STATE.idle,
    likeData: { liked: false, likeCount: 0 },
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setSocialStatus(state, action) {
      state.socialStatus = action.payload;
    },
    setDeleteStatus(state, action) {
      state.deleteStatus = action.payload;
    },
    setPostStatus(state, action) {
      state.postStatus = action.payload;
    },
    addComment(state, action) {
      state.comments = [...state.comments, action.payload.comment];
    },
    deleteComment(state, action) {
      const { id } = action.payload;
      state.comments = state.comments.filter((comment, index) => {
        return comment.id !== id;
      });
    },
    setLikeData(state, action) {
      const { liked, likeCount } = action.payload;
      state.likeData = { liked, likeCount };
    },
    editLikeData(state, action) {
      state.likeData.liked = action.payload.liked;
      state.likeData.likeCount = action.payload.likeCount;
    },
  },
});

export const obtainComments = (blog_id) => {
  return async (dispatch) => {
    try {
      dispatch(setSocialStatus(STATE.loading));
      const {
        data: { comments: allComments },
      } = await api.GetAllCommentsAPI(blog_id);
      if (allComments) {
        dispatch(setComments(allComments));
      }
      dispatch(setSocialStatus(STATE.idle));
    } catch (err) {
      // toast(err?.response?.data?.message);
      dispatch(setSocialStatus(STATE.failed));
    }
  };
};

export const giveComment = (blog_id, commentContent) => {
  return async (dispatch) => {
    try {
      dispatch(setPostStatus(STATE.loading));
      const {
        data: { comment },
      } = await api.PostCommentAPI(blog_id, commentContent);
      console.log(comment);
      if (comment) {
        dispatch(addComment({ comment }));
      }
      dispatch(setPostStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setPostStatus(STATE.failed));
    }
  };
};

export const removeComment = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteStatus(STATE.loading));
      const {
        data: { message },
      } = await api.DeleteCommentAPI(id);
      if (message) {
        dispatch(deleteComment({ id }));
      }
      dispatch(setDeleteStatus(STATE.idle));
    } catch (err) {
      toast(err?.response?.data?.message);
      dispatch(setDeleteStatus(STATE.failed));
    }
  };
};

export const getLikes = (blog_id) => {
  return async (dispatch) => {
    try {
      const {
        data: { message, likeCount, liked },
      } = await api.GetLikesAPI(blog_id);
      if (message) {
        dispatch(setLikeData({ likeCount, liked }));
      }
    } catch (err) {
      // toast(err?.response?.data?.message);
    }
  };
};

export const likeBlog = (blog_id) => {
  return async (dispatch) => {
    try {
      const {
        data: { message, likeCount, liked },
      } = await api.LikeBlogAPI(blog_id);
      if (message) {
        dispatch(editLikeData({ likeCount, liked }));
      }
    } catch (err) {
      toast(err?.response?.data?.message);
    }
  };
};

export const {
  setComments,
  setSocialStatus,
  addComment,
  deleteComment,
  setDeleteStatus,
  setPostStatus,
  setLikeData,
  editLikeData,
} = SocialSlice.actions;

export const getComments = (state) => state.Social.comments;
export const getSocialStatus = (state) => state.Social.socialStatus;
export const getDeleteStatus = (state) => state.Social.deleteStatus;
export const getPostStatus = (state) => state.Social.postStatus;
export const getLikeData = (state) => state.Social.likeData;

export default SocialSlice.reducer;
