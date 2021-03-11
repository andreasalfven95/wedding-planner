import React from 'react'
import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { imageUpload } from '../../utils/imageUpload'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router'

const ProductsManager = () => {
  const initialState = {
    title: '',
    price: 0,
    inStock: 0,
    description: '',
    content: '',
    category: '',
  }

  const [product, setProduct] = useState(initialState)
  const { title, price, inStock, description, content, category } = product

  const [images, setImages] = useState([])

  const { state, dispatch } = useContext(DataContext)
  const { categories, auth } = state

  const router = useRouter()
  const { id } = router.query
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`product/${id}`).then((res) => {
        setProduct(res.product)
        setImages(res.product.images)
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
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
      /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
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
      !price ||
      !inStock ||
      !description ||
      !content ||
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

  return (
    <div>
      <Head>
        <title>Products Manager</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <div className=''>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
        </div>

        <div className=''>
          <label
            className='block text-grey-darker text-sm font-bold my-2'
            htmlFor='price'
          >
            Price
          </label>
          <input
            type='number'
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
          <label
            className='block text-grey-darker text-sm font-bold my-2'
            htmlFor='inStock'
          >
            In stock
          </label>
          <input
            type='number'
            placeholder='In stock'
            name='inStock'
            value={inStock}
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
        </div>

        <div className=''>
          <textarea
            type='text'
            placeholder='Description'
            name='description'
            id='description'
            value={description}
            cols='30'
            rows='4'
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
          <textarea
            type='text'
            placeholder='Content'
            name='content'
            id='content'
            value={content}
            cols='30'
            rows='6'
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
          <div className=''>
            <select
              onChange={handleChangeInput}
              name='category'
              id='category'
              value={category}
              className='shadow border border-red rounded w-full py-2 px-3 text-grey-darker'
            >
              <option value='all' className=''>
                All Products
              </option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='block text-grey-darker text-sm font-bold my-2'>
            <label htmlFor='upload' className=''>
              Upload images (max 5)
            </label>
            <br />
            <input
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
              <div key={index} className='img-file h-56 w-1/5 hover:opacity-75'>
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
  )
}

export default ProductsManager
