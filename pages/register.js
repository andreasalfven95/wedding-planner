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
          <div className='form-group'>
            <label htmlFor='name'>Company</label>
            <input
              required
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={handleChangeInput}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              required
              type='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              title='Write a valid email: characters@characters.domain'
              className='form-control'
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

          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              required
              pattern='.{6,}'
              required
              title='6 characters minimum'
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='exampleInputPassword2'>Confirm password</label>
            <input
              required
              pattern='.{6,}'
              required
              title='6 characters minimum'
              type='password'
              className='form-control'
              id='exampleInputPassword2'
              name='cf_password'
              value={cf_password}
              onChange={handleChangeInput}
            />
          </div>

          <button type='submit' className='btn btn-dark w-100'>
            Register
          </button>

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
