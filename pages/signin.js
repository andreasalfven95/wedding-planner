import Head from 'next/head'
import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
/* import { Button } from '../components/Button' */

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
      return dispatch(
        { type: 'NOTIFY', payload: { error: res.err } },
        console.log('fault')
      )
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

    /* THIS REMOVES NOTICE/TOAST AFTER 3 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <SignInContainer>
        <form
          method='POST'
          className='mx-auto my-4'
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
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
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              required
              pattern='.{6,}'
              title='6 characters minimum'
              type='password'
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              id='exampleInputPassword1'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>

          <div className='flex items-center justify-between mb-3'>
            <button
              type='submit'
              className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
            >
              Sign in
            </button>
            {/* <a
              class='inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker'
              href='#'
            >
              Forgot Password?
            </a> */}
          </div>

          <p className=''>
            You don't have an account?
            {/* <NavBtn>
              <Button primary='true' round='true' href='/trips'>
                Register
              </Button>
            </NavBtn> */}
            <Link href='/register'>
              <a style={{ color: '#F26A2E' }}> Register now! </a>
            </Link>
          </p>
        </form>
      </SignInContainer>
    </>
  )
}

const SignInContainer = styled.div`
  width: 100%;
  background: #fcfcfc;
  color: #000;
  padding: 5rem calc((100vw - 1300px) / 2);
  padding-left: 1rem;
  padding-right: 1rem;
`

/* const NavBtn = styled.div`
  display: flex;
  align-items: center;
` */
