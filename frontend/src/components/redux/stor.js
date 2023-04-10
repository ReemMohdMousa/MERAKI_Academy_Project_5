import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/index"
import postsReducer from"./reducers/posts/index"
export default configureStore({
    reducer:{
        auth:authReducer,
        posts:postsReducer,
       
    }
})