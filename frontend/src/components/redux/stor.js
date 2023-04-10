import { configureStore } from "@reduxjs/toolkit";

// import the reducer
import authReducer from "./reducers/auth/index";
import friendsReducer from "./reducers/friends/index";
import postsReducer from"./reducers/posts/index"

export default configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    posts:postsReducer,
  },
});

