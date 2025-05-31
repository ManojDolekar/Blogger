import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../storage/authSlice'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import Logo from './Logo'


export const SignUp = () => {
    const navigate= useNavigate();
    const dispatch=useDispatch()
    const [error ,setError]=useState("")
    const{register, handleSubmit}= useForm()

    const create= async(data)=>{
        setError("")
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData= await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    navigate('/')
            } 
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className=' flex items-center justify-center  w-full '
    >
        <div
        className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
            <div
            className='mb-2 flex justify-center '>
                <span className=' inline-block w-full max-w-[100px]'>
                    <Logo className= ' invert-75' width='100%'/>
                </span>
            </div>
            <h2 className=' text-center text-2xl font-bold leading-tight text-gray-800'>
                Sign Up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account&nbsp;
                <Link
                    to="/login"
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                Sign In
                </Link>
            </p>
            {error && <p className=' text-red-600 mt-8'
            >{error}</p>}
            <form onSubmit={handleSubmit(create)}
            className='mt-8'>
            <div
            className='space-y-5'>
                <Input
                label="Name :"
                type="text"
                placeholder="Enter your name "
                {
                    ...register("name",{
                        required:true,
                    })
                }/>
                <Input
                label="Email :"
                type="email"
                placeholder="Enter your email"
                {
                    ...register('email',{
                        required:true,
                        validate:{
                            matchPattern:(value)=>/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email address must be a valid address",
                        }
                    })
                }
                />
                <Input
                label="Password :"
                type="password"
                placeholder="Enter your password"
                {
                    ...register('password',{
                        required:true,
                    })
                }
                />
                <Button
                className='w-full'
                type='submit'
                button='Create Account'

                />
                
            </div>
            </form>
        </div>
        
    </div>
)
}
