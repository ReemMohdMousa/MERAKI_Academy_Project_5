import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
  name: "posts",

  initialState: {
    posts: [],
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
        state.posts.map((elem,i)=>{
            if(elem.id===action.payload.id)
            {
                return(state.posts.splice(i,1,action.payload.updatedArticle))
            }
            return elem
            //dont forget return please
        })
  

    },
    removePost:(state,action)=>{

        state.posts.forEach((elem,idx)=>{
            if(elem.id===action.payload)
            {
                state.posts.splice(idx,1)
            }
        })
        // state.articles.map((elem)=>{
        //     console.log("DELETEArticles",elem)
        //   })
    

    },
    setComments: (state, action) => {
// state.articles = action.payload.comments;
state.posts.map((elem,i)=>{
    if(elem.id===action.payload.post_id)
    {
        elem.comments=action.payload.comments
    }
})


      },
      addComment: (state, action) => {
        state.posts.map((elem,i)=>{
            if(elem.id===action.payload.post_id)
            {
                elem.comments.push(action.payload.newComment)
            }
        })

        },

     
  },
});
export const {setPosts,addpost,updatePost, removePost,setComments, addComment } = posts.actions;

export default posts.reducer;
