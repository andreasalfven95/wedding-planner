import React, { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { VscSignIn } from 'react-icons/vsc'
import { menuData } from '../data/MenuData'
import { Button } from './Button'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

const Navbar = ({ toggle }) => {
  /* const router = useRouter() */
  const { state, dispatch } = useContext(DataContext)
  /* Import state, cart is if we want to show how many products we have in cart/favourites on the navbar. */
  const { auth, cart } = state

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
  }

  const loggedRouter = () => {
    return (
      <div className='items-center flex'>
        <Link href='/profile' passHref>
          <Button className='mr-4 px-2 sm:px-4'>
            <div className='h-8 w-8'>
              <img
                src={auth.user.avatar}
                alt='auth.user.avatar'
                className='rounded-full w-full h-full align-middle object-cover'
              />
            </div>
            <div className='ml-3 border-transparent hidden sm:flex'>
              {auth.user.name}
              <svg
                className='-mr-1 ml-2 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
          </Button>
        </Link>
        <Button className='mr-4 px-3 md:px-4' onClick={handleLogout}>
          <div className='hidden md:block md:mr-3'>Logout</div>
          <GrLogout className=''></GrLogout>
        </Button>
      </div>
    )
  }

  return (
    <nav className='bg-transparent h-20 flex flex-row z-50 relative justify-between'>
      <div className='flex flex-row justify-start'>
        <Link href='/' passHref>
          <a className='text-black flex items-center no-underline h-full cursor-pointer transition duration-200 ease-in-out text-2xl sm:text-3xl'>
            Wed2Be
          </a>
        </Link>
        <div className='hidden md:flex flex-row items-center'>
          {menuData.map((item, index) => (
            <Link href={item.link} passHref key={index}>
              <a className='text-gray-500 flex items-center ml-6 lg:ml-14 xl:ml-16 no-underline h-full cursor-pointer transition duration-200 ease-in-out hover:text-black'>
                {item.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex flex-row justify-end'>
        {Object.keys(auth).length === 0 ? (
          <div className='flex items-center'>
            <Link href='/signin' passHref>
              {/* <Button className='mr-4'>Sign In</Button> */}
              <Button className='mr-4 px-3 md:px-4'>
                <div className='hidden md:block md:mr-3'>Sign In</div>
                <VscSignIn className=''></VscSignIn>
              </Button>
            </Link>

            <Link href='/register' passHref>
              <Button className='mr-4'>Register</Button>
            </Link>
          </div>
        ) : (
          loggedRouter()
        )}

        {/*FaBars: transform: translate(-100%, 75%); */}
        <FaBars
          className='self-center justify-end text-2xl cursor-pointer text-black md:hidden'
          onClick={toggle}
        ></FaBars>
      </div>

      <div className='relative inline-block text-left'>
        <div>
          <button
            type='button'
            className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
            id='options-menu'
            aria-haspopup='true'
            aria-expanded='true'
          >
            Options
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clip-rule='evenodd'
              />
            </svg>
          </button>
        </div>

        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'
            >
              Account settings
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'
            >
              Support
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'
            >
              License
            </a>
            <form method='POST' action='#'>
              <button
                type='submit'
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                role='menuitem'
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

/* const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  position: relative;
`

const NavLink = styled.a`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none !important;

  &:hover {
    color: #f26a2e;
  }
`
const Bars = styled(FaBars)`
  display: none;
  color: #000;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 3px;
    right: -28.8px;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
` */
