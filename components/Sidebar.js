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
          ? 'md:hidden grid grid-rows-3 border-t text-center items-center border-beige-light bg-beige-lighter'
          : 'hidden'
      }
    >
      {menuData.map((item, index) => (
        <Link href={item.link} passHref key={index}>
          <a className='p-3 border-b rounded-t-none rounded-xl text-beige-darker border-beige-light text-center items-center h-full cursor-pointer transition duration-200 ease-in-out hover:text-black hover:bg-beige-light'>
            {item.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
