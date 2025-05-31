import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import service from '../appwrite/config'
import Container from '../components/Container/Container'
import PostForm from '../components/post-form/PostForm'

function EditPost() {

    const navigate=useNavigate();
    const [post,setPost]=useState(null)
    const {slug}=useParams();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
                else navigate('/')
            })
        }
        else navigate('/')
    },[])

    return post? (
    <div className='w-full py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    ) : null
}

export default EditPost