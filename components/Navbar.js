import React, { useContext } from 'react'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { VscSignIn } from 'react-icons/vsc'
import { menuData } from '../data/MenuData'
import { Button } from './Button'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

const Navbar = ({ toggle }) => {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  /* Import state, cart is if we want to show how many products we have in cart/favourites on the navbar. */
  const { auth, cart } = state

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })

    return router.push('/')
  }

  const loggedRouter = () => {
    return (
      <div className='items-center flex'>
        <div className='dropdown_btn relative inline-block text-left mr-4'>
          <div className=''>
            <Link href='/profile' passHref>
              <Button primary='true' className='px-2 sm:px-4'>
                <div className='h-8 w-8'>
                  <img
                    src={auth.user.avatar}
                    alt='auth.user.avatar'
                    className='rounded-full w-full h-full align-middle object-cover'
                  />
                </div>
                <div className='ml-3 border-transparent hidden sm:flex'>
                  {auth.user.name}
                  {auth.user.role === 'admin' && (
                    <svg
                      className='-mr-1 ml-2 h-5 w-5 self-center'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
              </Button>
            </Link>
          </div>

          {auth.user.role === 'admin' && (
            <div className='origin-top-right absolute right-0 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden sm:block'>
              <div
                className='py-1 dropdown'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <Link href='/users'>
                  <a
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                  >
                    Users
                  </a>
                </Link>
                <Link href='/create'>
                  <a
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                  >
                    Products
                  </a>
                </Link>
                <Link href='/categories'>
                  <a
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                  >
                    Categories
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>

        <Button primary='true' className='px-3 md:px-4' onClick={handleLogout}>
          <div className='hidden md:block md:mr-3'>Logga ut</div>
          <GrLogout className=''></GrLogout>
        </Button>
      </div>
    )
  }

  return (
    <nav className='contain h-20 flex flex-row z-30 relative justify-between bg-beige-lighter'>
      <div className='flex flex-row justify-start'>
        {/* <Link href='/' passHref className='flex items-center'>
          <img
            src='/img/sqLogo.svg'
            className='h-full py-3 cursor-pointer block sm:hidden'
          />
        </Link> */}
        <div className='w-full h-full flex items-center py-3 pr-4'>
          <Link href='/' passHref className='flex items-center'>
            <img
              src='/img/logo.svg'
              className='w-full max-h-full cursor-pointer'
            />
          </Link>
        </div>
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
              <Button primary='true' round='true' className='px-3 md:px-4'>
                <div className='block font-bold'>Företag?</div>
              </Button>
            </Link>
            {/* <Link href='/signin' passHref>
              <Button primary='true' className='mr-4 px-3 md:px-4'>
                <div className='hidden md:block md:mr-3'>Logga in</div>
                <VscSignIn className=''></VscSignIn>
              </Button>
            </Link>

            <Link href='/register' passHref>
              <Button primary='true' className=''>
                Registrera
              </Button>
            </Link> */}
          </div>
        ) : (
          loggedRouter()
        )}

        <FaBars
          className='ml-4 self-center justify-end text-2xl cursor-pointer text-black md:hidden'
          onClick={toggle}
        ></FaBars>
      </div>
    </nav>
  )
}

export default Navbar
