import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:null
}

const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts=action.payload
            
            // const newPosts = action.payload; 
            // console.log(newPosts);
            // Array of posts

            // Filter out posts that already exist in the store
            // const uniquePosts = newPosts.filter(
            //     (newPost) => !state.posts.some((post) => post.$id === newPost.$id)
            // );
        
            // Add only unique posts
            // state.posts.push(postt,...uniquePosts);
            // state.posts=state.posts.map((post)=>post.featuredImage!==featuredImage && post.userId!==userId ? state.posts.push(postt) : null)
        },
        deletePost:(state,action)=>{
            state.posts=state.posts.filter((post)=>post.featuredImage!==action.payload)
        }
        
    }
})

export const {addPost,deletePost}=postSlice.actions;
export default postSlice.reducer