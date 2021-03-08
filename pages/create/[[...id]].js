import React from 'react'
import Head from 'next/head'
import { useState, useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const ProductsManager = () => {
  const initialState = {
    product_id: '',
    title: '',
    price: 0,
    inStock: 0,
    description: '',
    content: '',
    category: '',
  }

  const [product, setProduct] = useState(initialState)
  const {
    product_id,
    title,
    price,
    inStock,
    description,
    content,
    category,
  } = product

  const [images, setImages] = useState([])

  const { state, dispatch } = useContext(DataContext)
  const { categories } = state

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
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Select up to 5 images.' },
      })
    setImages([...images, ...newImages])
  }

  const deleteImage = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  return (
    <div>
      <Head>
        <title>Products Manager</title>
      </Head>

      <form>
        <div className=''>
          <input
            type='text'
            placeholder='Product ID'
            name='product_id'
            value={product_id}
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
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
          <input
            type='number'
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChangeInput}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
          />
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
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
            >
              <option value='all'>All Products</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='upload'>
            <div className=''>
              <span className=''>Upload</span>
            </div>
            <div className=''>
              <input
                type='file'
                name=''
                id=''
                onChange={handleUploadInput}
                multiple
                accept='image/*'
              />
            </div>
          </div>
          <div className='images'>
            {images.map((img, index) => (
              <div key={index} className='img-file'>
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=''
                  className='img-thumbnail'
                />
                <span
                  onClick={() => deleteImage(index)}
                  className='text-2xl border border-red-600 text-red-600'
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
      <button
        type='submit'
        className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
      >
        Create
      </button>
    </div>
  )
}

export default ProductsManager
