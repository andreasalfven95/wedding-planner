import Head from 'next/head'
import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import { useRouter } from 'next/router'

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

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  return (
    <div className='contain bg-beige-lighter h-screen'>
      <Head>
        <title>Register</title>
      </Head>
      <div className='pt-36'>
        <form
          method='POST'
          className='mx-auto'
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='name'>Företagsnamn</label>
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
            <small id='emailHelp' className='form-text text-muted'>
              Vi kommer aldrig att lämna ut er e-postadress utan tillåtelse.
            </small>
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='exampleInputPassword1'>Lösenord</label>
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
            <label htmlFor='exampleInputPassword2'>Bekräfta lösenord</label>
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
          <div className='flex items-center justify-between mb-6'>
            <button
              type='submit'
              className='bg-beige-normal hover:bg-beige-dark text-white font-bold py-2 px-4 rounded'
            >
              Registrera
            </button>
          </div>

          <p className='font-bold'>
            Har ni redan ett konto?
            <Link href='/signin'>
              <a className='ml-1 text-white bg-beige-normal p-2 px-3 rounded-xl font-bold'>
                Logga in här!
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
