import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import service from '../appwrite/config'
import Container from '../components/Container/Container'


function Home() {

    const [posts,setposts]=useState([]);
    
    useEffect(()=>{
        service.getPosts([]).then((posts)=>{
            if(posts){
                setposts(posts.documents)
            }
    })
    },[])

    if(posts.length===0){
        return(
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts? (                        
                        posts.map((post)=>(
                            <div  key={post.$id} className='w-1/4 my-auto mx-auto p-2'>
                                <PostCard {...post}/>
                            </div>
                        ))
                    ) : null
                }
            </div>
        </Container>
    </div>
  )
}

export default Home