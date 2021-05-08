import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { FaCamera } from 'react-icons/fa'
import { imageUpload } from '../utils/imageUpload'
import { postData, getData, putData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import Link from 'next/link'

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'

const Profile = () => {
  const initialStateUser = {
    avatar: '',
    name: '',
    password: '',
    cf_password: '',
  }

  const initialStateProduct = {
    title: '',
    description: '',
    content: '',
    about: '',
    category: '',
    email: '',
    phone: '',
  }

  const [product, setProduct] = useState(initialStateProduct)
  const { title, description, content, about, category, email, phone } = product

  const [data, setData] = useState(initialStateUser)
  const { avatar, name, password, cf_password } = data

  const [images, setImages] = useState([])

  const { state, dispatch } = useContext(DataContext)
  const { auth, notify, categories } = state

  const router = useRouter()
  const { id } = router.query
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name })
  }, [auth.user])

  useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`product/${id}`).then((res) => {
        setProduct(res.product)
        setImages(res.product.images)
      })
    } else {
      setOnEdit(false)
      setProduct(initialStateProduct)
      setImages([])
    }
  }, [id])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleUploadInput = (e) => {
    dispatch({ type: 'NOTIFY', payload: {} })
    let newImages = []
    let num = 0
    let err = ''
    const files = [...e.target.files]

    if (files.length === 0)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'No image chosen or files does not exist.' },
      })
    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = 'The largest file size is 1 MB.')
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'Image format is incorrect.')

      num += 1
      if (num <= 5) newImages.push(file)
      return newImages
    })
    if (err) dispatch({ type: 'NOTIFY', payload: { error: err } })

    const imgCount = images.length
    if (imgCount + newImages.length > 5) {
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Select up to 5 images.' },
      })
    }
    setImages([...images, ...newImages])
  }

  const deleteImage = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Authentication is not valid.' },
      })

    if (
      !title ||
      !description ||
      !content ||
      !about ||
      !email ||
      !phone ||
      category === 'all' ||
      images.length === 0
    )
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Please add all the fields.' },
      })

    dispatch({
      type: 'NOTIFY',
      payload: { loading: true },
    })
    let media = []
    const imgNewURL = images.filter((img) => !img.url)
    const imgOldURL = images.filter((img) => img.url)

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL)

    let res
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        {
          ...product,
          images: [...imgOldURL, ...media],
        },
        auth.token
      )
      if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
    } else {
      res = await postData(
        'product',
        {
          ...product,
          images: [...imgOldURL, ...media],
        },
        auth.token
      )
      if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
    }
    return dispatch({
      type: 'NOTIFY',
      payload: { success: res.msg },
    })
  }

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

      <section className='my-3'>
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
        <div className='mt-8'>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='category'
              >
                Kategori*
              </label>
              <select
                required
                onChange={handleChangeInput}
                name='category'
                id='category'
                value={category}
                className='shadow border border-red rounded w-full py-2 px-3 text-grey-darker'
              >
                <option value='all' className=''>
                  Välj en kategori
                </option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=''>
              {/* if kategori === "festlokal", add input on "max antal gäster" */}
            </div>
            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='title'
              >
                Titel*
              </label>
              <input
                required
                type='text'
                placeholder='Titel'
                name='title'
                value={title}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
            </div>

            <div>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='description'
              >
                Slogan*
              </label>
              <textarea
                required
                type='text'
                placeholder='Fånga läsaren!'
                name='description'
                id='description'
                value={description}
                cols='30'
                rows='1'
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='description'
              >
                Sammanfattning*
              </label>
              <textarea
                required
                type='text'
                placeholder='Det bästa med er...'
                name='content'
                id='content'
                value={content}
                cols='30'
                rows='3'
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='description'
              >
                All information*
              </label>
              <textarea
                required
                type='text'
                placeholder='Ge läsaren hela storyn...'
                name='about'
                id='about'
                value={about}
                cols='30'
                rows='6'
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
            </div>
            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='Email'
              >
                Email*
              </label>
              <input
                required
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='phone'
              >
                Telefon*
              </label>
              <input
                required
                type='tel'
                placeholder='070-123 45 67'
                name='phone'
                value={phone}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <small>Format: 070-123 45 67</small>
            </div>

            <div className=''>
              <div className='my-4'>
                <label
                  htmlFor='upload'
                  className='block text-grey-darker text-sm font-bold'
                >
                  Upload images (max 5)
                </label>
                <input
                  /* required */
                  type='file'
                  name='upload'
                  id='upload'
                  onChange={handleUploadInput}
                  multiple
                  accept='image/*'
                />
              </div>
              <div className='images w-full flex'>
                {images.map((img, index) => (
                  <div
                    key={index}
                    className='img-file h-56 w-1/5 hover:opacity-75'
                  >
                    <div className='w-full h-full p-1 relative'>
                      <img
                        src={img.url ? img.url : URL.createObjectURL(img)}
                        alt=''
                        className='img-thumbnail w-full h-full'
                      />
                      <span
                        onClick={() => deleteImage(index)}
                        className='cursor-pointer hover:scale-95 flex flex-row justify-center items-center text-2xl border border-gray-300 font-extrabold bg-white hover:bg-gray-300 h-8 w-8 rounded-full text-red-600 absolute top-0 right-0'
                      >
                        x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type='submit'
              className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
            >
              {onEdit ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile
