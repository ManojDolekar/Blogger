import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import service from '../appwrite/config'
import Container from '../components/Container/Container';
import { useSelector,useDispatch } from 'react-redux';
import { addPost ,deletePost } from '../storage/postSlice';

function AllPosts() {

    const[posts,setPosts]=useState([]);
    const storedPosts=useSelector(state=>state.postData.posts);
    if(posts.length>0)console.log(storedPosts);
    
    const dispatch=useDispatch();
    
    const fetchPosts=async()=>{
            try {
                const session=  await service.getPosts([]).then((posts)=>dispatch(addPost(posts.documents)))
            
            if(session && storedPosts !== null ){
                setPosts(storedPosts)
            }
            // else if(posts.length>=0){
            //     setPosts(storedPosts)           
            // }
            else{
                setPosts(session.payload)
            }
            } catch (error) {
                console.error(error)
                
            }
    }

    useEffect(()=>{
        fetchPosts();
    },[])

    return (
        posts.length>0 &&
     <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    
                    <div key={post.featuredImage} className='p-2 m-auto w-1/4'>
                        {console.log(post)}
                        
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
            </Container>
    </div>
    )
}

export default AllPosts