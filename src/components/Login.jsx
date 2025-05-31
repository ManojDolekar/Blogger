import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../storage/authSlice'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'
import { addPost } from '../storage/postSlice'
import service from '../appwrite/config'


export const Login = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [error ,setError]=useState("")
    const{register, handleSubmit}= useForm()
    
    const login= async (data)=>{
        setError("")
        try {
            const session=await authService.login(data);
            if(session){
                const userData= await authService.getCurrentUser();
                const postData=await service.getPosts([])
                if(postData) dispatch(addPost(postData.documents))
                
                if(userData) dispatch(authLogin(userData))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div
    className=' flex items-center justify-center  w-full'
    >
        <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
            <div
            className='mb-2 flex justify-center '>
                <span className=' inline-block w-full max-w-[100px]'>
                    <Logo className= ' invert-75' width='100%'/>
                </span>
            </div>
            <h2 className=' text-center text-2xl font-bold text-gray-700 leading-tight'>
                Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                Sign Up
                </Link>
            </p>
            {error && <p className=' text-red-600 mt-8'
            >{error}</p>}
            <form onSubmit={handleSubmit(login)}
            className='mt-8'>
                <div className=' space-y-5'>
                    <Input 
                    label="Email :"
                    type="email"
                    placeholder="Enter your email"
                    { ...register("email",{
                        required:true,
                        validate:{
                            matchPattern:(value)=> /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password :"
                    type="password"
                    placeholder="Enter your password"
                    {
                        ...register("password",{
                            required:true,
                        })
                    }
                    />
                    <div className=' items-center flex'>
                    <Button 
                    type='submit'
                    
                    button='Login'
                    className='mx-auto  w-1/4 rounded-4xl '
                    />
                    </div>
                    
                </div>
            </form>

        </div>
        
    </div>
)
}


