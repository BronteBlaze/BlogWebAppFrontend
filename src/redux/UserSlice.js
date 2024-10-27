import { createSlice } from "@reduxjs/toolkit";
import * as api from "@/API/UserAPI";
import { toast } from "react-toastify";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const UserSlice = createSlice({
  name: "User",
  initialState: {
    authStatus: STATE.idle,
    authError: "",
    signUpSuccess: false,
    isLoggedIn: false,
    loginStatus: STATE.idle,
    uploadingStatus: STATE.idle,
    userData: {},
  },
  reducers: {
    setAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setAuthError(state, action) {
      state.authError = action.payload;
    },
    setSignUpSuccess(state, action) {
      state.signUpSuccess = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setUploadingStatus(state, action) {
      state.uploadingStatus = action.payload;
    },
    addProfilePic(state, action) {
      state.userData = { ...state.userData, profile_pic: action.payload };
    },
    logOut() {},
  },
});

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(setAuthStatus(STATE.loading));
    try {
      const {
        data: { message },
      } = await api.SignUpAPI(userData);
      if (message) {
        dispatch(setAuthStatus(STATE.idle));
        dispatch(setSignUpSuccess(true));
      }
    } catch (err) {
      dispatch(setAuthError(err?.response?.data?.message));
      dispatch(setAuthStatus(STATE.failed));
    }
  };
};

export const signInUser = (email, password) => {
  return async (dispatch) => {
    dispatch(setAuthStatus(STATE.loading));
    try {
      const { data } = await api.SignInAPI(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUserData(data));
        dispatch(setAuthStatus(STATE.idle));
        dispatch(setIsLoggedIn(true));
      }
    } catch (err) {
      dispatch(setAuthError(err?.response?.data?.message));
      dispatch(setAuthStatus(STATE.failed));
      console.log(err);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const response = await api.checkAuthAPI();
      if (response) {
        dispatch(setIsLoggedIn(true));
      }
    } catch (err) {
      toast("Not authenticated");
      dispatch(setIsLoggedIn(false));
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    dispatch(setLoginStatus(STATE.loading));
    dispatch(setAuthStatus(STATE.loading));
    try {
      const {
        data: { message },
      } = await api.SignOutAPI();
      if (message) {
        localStorage.removeItem("token");
        dispatch(setIsLoggedIn(false));
        dispatch(setLoginStatus(STATE.idle));
        dispatch(setAuthStatus(STATE.idle));
        dispatch(logOut());
        window.location.reload();
      }
    } catch (err) {
      dispatch(setAuthError(err?.response?.data?.message));
      dispatch(setLoginStatus(STATE.failed));
      dispatch(setAuthStatus(STATE.failed));
    }
  };
};

export const uploadProfile = (userProfile) => {
  return async (dispatch) => {
    try {
      dispatch(setUploadingStatus(STATE.loading));
      const {
        data: { profile_pic },
      } = await api.UploadProfileAPI(userProfile);
      if (profile_pic) {
        dispatch(addProfilePic(profile_pic));
        toast("Profile picture has been uploaded");
      }
      dispatch(setUploadingStatus(STATE.idle));
    } catch (err) {
      console.log(err);
      toast(err?.response?.data?.message);
      dispatch(setUploadingStatus(STATE.failed));
    }
  };
};

export const {
  setAuthError,
  setAuthStatus,
  setSignUpSuccess,
  setIsLoggedIn,
  setLoginStatus,
  setUserData,
  setUploadingStatus,
  logOut,
  addProfilePic,
} = UserSlice.actions;

export const getAuthError = (state) => state.User.authError;
export const getAuthStatus = (state) => state.User.authStatus;
export const getLoginStatus = (state) => state.User.loginStatus;
export const getSignUpStatus = (state) => state.User.signUpSuccess;
export const getIsLoggedIn = (state) => state.User.isLoggedIn;
export const getUserData = (state) => state.User.userData;
export const getUploadingStatus = (state) => state.User.uploadingStatus;

export default UserSlice.reducer;
