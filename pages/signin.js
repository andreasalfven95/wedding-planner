import Head from 'next/head'
import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { Button } from '../components/Button'

export default function SignIn() {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await postData('auth/login', userData)

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    }
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    })

    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  return (
    <div className='contain bg-beige-lighter'>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className='pt-44'>
        <form
          method='POST'
          className='mx-auto max-w-screen-sm'
          /* style={{ maxWidth: '500px' }} */
          onSubmit={handleSubmit}
        >
          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputEmail1'>E-postadress</label>
            <input
              required
              type='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              title='Write a valid email: characters@characters.domain'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div className='block text-grey-darker text-sm font-bold mb-4'>
            <label htmlFor='exampleInputPassword1'>Lösenord</label>
            <input
              required
              pattern='.{6,}'
              title='6 characters minimum'
              type='password'
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              id='exampleInputPassword1'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className='flex items-center justify-between mb-8'>
            <button
              type='submit'
              className='bg-beige-normal hover:bg-beige-dark text-white font-bold py-2 px-4 rounded'
            >
              Logga in
            </button>
            {/* <a
              class='inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker'
              href='#'
            >
              Forgot Password?
            </a> */}
          </div>

          <div className='flex items-center'>
            <p className='font-bold mr-2'>Har ni inget konto?</p>
            <Link href='/register' passHref>
              <Button primary='true' round='true'>
                <a className='block font-bold'>Registrera er här!</a>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

/* const NavBtn = styled.div`
  display: flex;
  align-items: center;
` */
