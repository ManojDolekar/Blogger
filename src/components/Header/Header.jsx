import React from 'react'
import LogoutBtn from './LogoutBtn'
import Logo from '../Logo'
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  
  const authStatus= useSelector(state=> state.auth.status)
  const navigate=useNavigate()

  const navItems=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!authStatus
    },
    {
      name:"All Post",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:authStatus
    },
  ]
  
  return (
   <header className=' py-3 bg-transparent'>
      <Container>
        <nav className=' flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo/>
            </Link>
          </div>
          <ul className=' flex ml-auto'>
            {
              navItems.map((item)=>(
                item.active ? (
                  <li
                  key={item.name}>
                    <button
                    onClick={ ()=> navigate(item.slug)}
                    className=' cursor-pointer inline-block px-6 py-2 duration-200  hover:bg-white hover:drop-shadow-lg hover:shadow-black hover:text-[#10e7dc] rounded-full'
                    >
                      {item.name}
                    </button>
                  </li>
                ): null
              ))
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )
            }
          </ul>

        </nav>
      </Container>
   </header>
  )
}

