import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className=' bg-black h-[50px] w-screen flex justify-between items-center px-[30px]'>
         <div className="logo font-bold text-white ">YourPass</div>
         <ul className="flex gap-[10px] text-white">
            <li>Home</li>
            <li>About</li>
         </ul>
    </div>
    </>
  )
}

export default Navbar
