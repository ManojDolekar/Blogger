import React, { useEffect, useState } from 'react'
import { useParams , useNavigate,Link } from 'react-router-dom'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container/Container';
import parse from 'html-react-parser'


function Post() {

    const [post,setPost]=useState(null);
    const {slug}=useParams();
    
    const navigate = useNavigate();
    const userData=useSelector(state=>state.auth.userData);

    console.log(userData);
    
    
    const isAuthor=post && userData ? userData.$id===post.userId : false;

    useEffect(()=>{
        if(slug) {
            service.getPost(slug).then((post)=>{
                if(post) setPost(post) ;
                else navigate('/');
        });
        }
        else{
            navigate('/')
        }
        
    },[slug,navigate])
    

    const deletePost= async ()=>{
        const status= await service.deletePost(post.$id);
        if(status){
            await service.deleteFile(post.featuredImage);
            navigate('/')
        }

    }

    return post? (
        <div className='py-8 '>
        <Container>
            <div className='w-full flex flex-wrap   justify-center mb-4 relative  rounded-xl p-2'>       
            <div className='w-2xl'><img  src={service.getFilePreview(post.featuredImage)} width={'100%'} alt={post.title} 
            className=' rounded-lg '/></div>
            {isAuthor && 
                (
                <div className='absolute right-6 my-4 top-6'>
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button
                        type='button'
                        button='Edit'
                        bgColor='bg-green-500' className=" mr-3" 
                        >
                            Edit
                        </Button>
                    </Link>

                        <Button
                        type='button'
                        button='Delete'
                        bgColor="bg-red-500"
                        onClick={deletePost}
                        >
                            Delete
                        </Button>
                </div>
            )                
            }
                <div className="w-full  mb-6">
                    <h1 className="text-2xl text-center font-bold">{post.title}</h1>
                </div>

            <div className=' browser-css' >
                {parse(post.content)}
            </div>
        </div>
        </Container>
        </div>

    ): null
}

export default Post