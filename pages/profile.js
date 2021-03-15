import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { FaCamera } from 'react-icons/fa'
import Link from 'next/link'

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'

import { imageUpload } from '../utils/imageUpload'

const Profile = () => {
  const initialState = {
    avatar: '',
    name: '',
    password: '',
    cf_password: '',
  }

  const [data, setData] = useState(initialState)
  const { avatar, name, password, cf_password } = data

  const { state, dispatch } = useContext(DataContext)
  const { auth, notify } = state

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name })
  }, [auth.user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password)

      if (errMsg)
        return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
      updatePassword()
    }

    if (name !== auth.user.name || avatar) updateInfor()
  }

  const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    patchData('user/resetPassword', { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
  }

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'File does not exist.' },
      })
    if (file.size > 1024 * 1024 * 2)
      //2mb
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Image must be less than 2MB.' },
      })
    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      //2mb
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Image must be either JPEG or PNG.' },
      })

    setData({ ...data, avatar: file })
  }

  const updateInfor = async () => {
    let media
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    if (avatar) media = await imageUpload([avatar])

    patchData(
      'user',
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

      dispatch({
        type: 'AUTH',
        payload: {
          token: auth.token,
          user: res.user,
        },
      })
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
  }

  if (!auth.user) {
    return null
  }
  return (
    <div className='profile_page'>
      <Head>
        <title>Profile</title>
      </Head>

      <section className='flex flex-row my-3'>
        <div className=''>
          <h3 className='text-center uppercase'>
            {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
          </h3>
          <div className='w-40 h-40 overflow-hidden relative my-4 mx-auto border border-solid border-gray-300 rounded-full'>
            <img
              className='w-full h-full block object-cover'
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt='avatar'
            />
            <span className='absolute bottom-0 left-0 w-full h-2/5 bg-gray-500 bg-opacity-70 text-center font-normal cursor-pointer'>
              <FaCamera className='cursor-pointer mx-auto' />
              <p className='cursor-pointer'>Change</p>
              <input
                className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                type='file'
                name='file'
                id='file_up'
                accept='image/*'
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              placeholder='Your name'
              onChange={handleChange}
            />
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              defaultValue={auth.user.email}
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              disabled={true}
            />
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='password'>New Password</label>
            <input
              pattern='.{6,}'
              title='6 characters minimum'
              type='password'
              name='password'
              value={password}
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              placeholder='Your new password'
              onChange={handleChange}
            />
          </div>

          <div className='block text-grey-darker text-sm font-bold mb-2'>
            <label htmlFor='cf_password'>Confirm new password</label>
            <input
              pattern='.{6,}'
              title='6 characters minimum'
              type='password'
              name='cf_password'
              value={cf_password}
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              placeholder='Confirm new password'
              onChange={handleChange}
            />
          </div>

          <button
            /* type='submit' */
            className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
            disabled={notify.loading}
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profile
