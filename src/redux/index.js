import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import BlogReducer from "./BlogSlice";
import SocialReducer from "./SocialSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [],
};

const reducer = combineReducers({
  User: UserReducer,
  Blog: BlogReducer,
  Social: SocialReducer,
});

const appReducer = (state, action) => {
  if (action.type === "User/logOut") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
