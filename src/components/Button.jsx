import React from 'react'

function Button({
    button,
    type="button",
    bgColor=""||"bg-blue-500",
    className="",
    ...props
}) {

  return (
    <button
    className={`py-2 px-4 w-25 cursor-pointer rounded-3xl duration-200 hover:shadow-lg hover:shadow-gray-500  focus:scale-95 focus:shadow  hover:scale-101  ${className} ${bgColor}  `} type={type} {...props}
    >
        {button} 
    </button>
  )
}

export default Button