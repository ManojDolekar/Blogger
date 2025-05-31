import React from 'react'
import blog  from '../images/bloger.png'

function Logo({width="10px",...props}) {
  return (
    <div width={width}>
      {/* <img src={blog} alt="logo" width='150px' {...props} /> */}
      <h1 className=' text-[#0074E1] text-3xl font-bold'><b className='font-extrabold'>.</b>Blogger</h1>
    </div>
  )
}

export default Logo;