import React from 'react'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'
import { menuData } from '../data/MenuData'

function Sidebar({ isOpen, toggle }) {
  return (
    <div
      isOpen={isOpen}
      onClick={toggle}
      className={
        isOpen
          ? 'md:hidden grid grid-rows-3 text-center items-center border-b border-t mb-4'
          : 'hidden'
      }
    >
      {menuData.map((item, index) => (
        <Link href={item.link} passHref key={index}>
          <a className='p-3 text-gray-500 text-center items-center -no-underline h-full cursor-pointer transition duration-200 ease-in-out hover:text-black'>
            {item.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
