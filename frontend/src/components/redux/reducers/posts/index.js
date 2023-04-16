import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    likes: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      //   state.articles.map((elem)=>{
      //     console.log("SETArticles",elem)
      //   })
    },
    addpost: (state, action) => {
      state.posts.push(action.payload);
      //   state.articles.map((elem)=>{
      //     console.log("ADDArticles",elem)
      //   })
    },
    updatePost: (state, action) => {
      console.log("payload", action.payload);
      state.posts.map((elem, i) => {
        if (elem.post_id == action.payload.updatedpost.post_id) {
          return state.posts.splice(i, 1, action.payload.updatedpost);
        }
        return elem;
        //dont forget return please
      });
    },
    removePost: (state, action) => {
      state.posts.forEach((elem, idx) => {
        if (elem.post_id === action.payload) {
          state.posts.splice(idx, 1);
        }
      });
      // state.articles.map((elem)=>{
      //     console.log("DELETEArticles",elem)
      //   })
    },
    setComments: (state, action) => {
      // state.articles = action.payload.comments;
      state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.id) {
          elem.comments = action.payload.comments;
        }
      });
    },
    addComment: (state, action) => {
      state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.id) {
          elem.comments.push(action.payload.newComment);
        }
      });
    },
    updateComment: (state, action) => {
      console.log("payload", state.posts.comments);
      state.posts.comments.map((elem, i) => {
        if (elem.comment_id == action.payload.updatedcomment.comment_id ) {
          return state.posts.comments.splice(i, 1, action.payload.updatedcomment);
        }
        return elem;
        //dont forget return please
      });
    },

    addLike: (state, action) => {
      console.log("from reducer", action.payload);
      state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.post_id) {
          console.log("****");
          state.likes.push(action.payload);
        }
      });
    },

    setLike: (state, action) => {
      console.log("state", action);
    },
  },
});
export const {
  setPosts,
  addpost,
  updatePost,
  removePost,
  setComments,
  addComment,
  addLike,
  setLike,
  updateComment,
} = posts.actions;

export default posts.reducer;
