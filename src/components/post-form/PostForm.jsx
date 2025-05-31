import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import service from '../../appwrite/config'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import authService from '../../appwrite/auth'
import { addPost } from '../../storage/postSlice'


function PostForm({post}) {

    const {register,handleSubmit,setValue,getValues,watch,control}=useForm({
        defaultValues:{
            title:post?.title ||"", 
            content:post?.content ||"" ,
            slug:post?.slug ||"",
            status:post?.status||"active",  
        }
    })
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);
    const dispatch=useDispatch()

    const submit=async (data)=>{
        if(post){
            const file= data.image[0]? await service.uploadFile(data.image[0]) : null
            if(file){
                await service.deleteFile(post.featuredImage)
            }
            console.log(post.$id);
            
            const dbPost=await service.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage:file?file.$id : undefined
                }
            )
            await service.getPosts([]).then((posts)=>dispatch(addPost(posts)))
            if(dbPost) navigate(`/post/${dbPost.$id}`)
        }
    else{
        const file=  await service.uploadFile(data.image[0]) 
        if(file){
            const fileId=file.$id;
            data.featuredImage=fileId
        }
        const dbPost=await service.createPost({
            ...data,      
            userId:userData.$id  
        })
        
        console.log(data.slug);
        
        
        
        if(dbPost) navigate(`/post/${dbPost.$id}`)
            service.getPosts([]).then((posts)=>dispatch(addPost(posts)))
    }

    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value == "string")
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g,'-')
        
        return ''
    },[])

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title))
            }
        })

        return ()=>{
            subscription.unsubscribe()          // for optimization 
        }

    },[watch,setValue,slugTransform])

    const handlePost=useCallback(()=>{
        service.getPosts([]).then((posts)=>(dispatch(addPost(posts))))
    },[dispatch])

    return (
        <form onSubmit={handleSubmit(submit)}
        className='flex flex-wrap my-4'>
            <div className=' w-2/3 px-2'>
                <Input
                label='Title'
                type='text'
                placeholder='title'
                {
                    ...register('title',{
                        required:true
                    })
                }
                />
                <Input
                label='Slug'
                type='text'
                placeholder='slug'
                {
                    ...register('slug',{
                        required:true,
                    })
                }
                onInput={(e)=>{
                    setValue('slug',slugTransform(e.currentTarget.value),{
                        shouldValidate:true
                    })
                }}
                />
                <RTE
                control={control}
                label='Content'
                defaultValue={getValues('content')}
                
                />
            </div>
                <div className='w-1/3 px-2'>
                    <Input
                    label='Image'
                    type='file'
                    className='mb-4'
                    accept='image/png,image/jpg,image/jpeg,image/gif'
                    {
                        ...register('image',{
                            required:!post
                        })
                    }
                    />
                    {
                        post &&(
                            <div className=' w-full '>
                                <img className=' rounded-lg' src={service.getFilePreview(post.featuredImage)} alt={post.title} />
                            </div>
                        )
                    }
                    <Select
                    options={['active','inactive']}
                    label='Status'
                    className='mb-4'
                    {
                        ...register('status',{required:true})
                    }
                    />
                    <Button
                    type='submit'
                    onClick={handlePost}
                    bgColor={post ? "bg-green-500" : "bg-[#F79E02]"}
                    className="w-full"
                    button={post ? 'Update' :'Submit'}
                    >
                        
                    </Button>                
                </div>
        </form>
    )
}

export default PostForm