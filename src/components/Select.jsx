import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id= useId()
  return (
    <div>
        {
            label && <label className='text-black' htmlFor="id">{label}</label>
        }
        <select 
        name="" 
        id={id}
        {...props}
        ref={ref}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}>
            {
                options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)