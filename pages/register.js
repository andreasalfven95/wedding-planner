import Head from 'next/head'
import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import { useRouter } from 'next/router'

/* import { Button } from '../components/Button' */

export default function Register() {
  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData

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
    const errMsg = valid(name, email, password, cf_password)
    if (errMsg) {
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/register', userData)

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    }

    /* router.push('/signin') */

    /* THIS REMOVES NOTICE/TOAST AFTER 3 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterContainer>
        <form
          method='POST'
          className='mx-auto my-4'
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='name'>Company</label>
            <input
              required
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='name'
              name='name'
              value={name}
              onChange={handleChangeInput}
            />
          </div>

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
              We'll never share your email without permission.
            </small>
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              required
              pattern='.{6,}'
              required
              title='6 characters minimum'
              type='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='exampleInputPassword1'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputPassword2'>Confirm password</label>
            <input
              required
              pattern='.{6,}'
              required
              title='6 characters minimum'
              type='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='exampleInputPassword2'
              name='cf_password'
              value={cf_password}
              onChange={handleChangeInput}
            />
          </div>
          <div className='flex items-center justify-between mb-3'>
            <button
              type='submit'
              className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
            >
              Register
            </button>
          </div>

          <p>
            Already have an account?
            {/* <NavBtn>
              <Button primary='true' round='true' href='/trips'>
                Register
              </Button>
            </NavBtn> */}
            <Link href='/signin'>
              <a style={{ color: '#F26A2E' }}> Sign in!</a>
            </Link>
          </p>
        </form>
      </RegisterContainer>
    </>
  )
}

const RegisterContainer = styled.div`
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
