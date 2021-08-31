import React from 'react'
import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { imageUpload } from '../../utils/imageUpload'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router'

import valid from '../../utils/valid'
import { patchData } from '../../utils/fetchData'
import County from '../../data/County'
import Select from 'react-select'
import dynamic from 'next/dynamic'
import PlacesAutocomplete from 'react-places-autocomplete'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'

const TextEditor = dynamic(() => import('../../components/Editor'), {
  ssr: false,
})

const ProductsManager = () => {
  const initialStateProduct = {
    userid: '',
    title: '',
    description: '',
    content: '',
    category: '',
    guests: '',
    email: '',
    phone: '',
    instagram: '',
    facebook: '',
    website: '',
  }

  const [product, setProduct] = useState(initialStateProduct)
  const {
    userid,
    title,
    description,
    content,
    category,
    guests,
    email,
    phone,
    instagram,
    facebook,
    website,
  } = product

  const [show, setShow] = useState(false)
  const [about, setAbout] = useState('')
  const [updatedAbout, setUpdatedAbout] = useState('')
  const [images, setImages] = useState([])
  const [county, setCounty] = useState([])
  const [address, setAddress] = useState('')
  const [primAddress, setPrimAddress] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

  const { state, dispatch } = useContext(DataContext)
  const { auth, notify, categories } = state
  const router = useRouter()

  const { id } = router.query
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`product/${id}`).then((res) => {
        setProduct(res.product)
        setAbout(res.product.about)
        setShow(res.product.show)
        setImages(res.product.images)
        setCounty(res.product.county)
        setPrimAddress(res.product.address)
        setAddress(res.product.address)
        setCoordinates(res.product.coordinates)
      })
    } else {
      setOnEdit(false)
      setProduct(initialStateProduct)
      setAbout('')
      setShow(false)
      setImages([])
      setCounty([])
      setAddress('')
      setCoordinates({ lat: null, lng: null })
      /* setCoordinates({}) */
    }
  }, [id])

  const searchOptions = {
    types: ['address'],
    componentRestrictions: { country: 'se' },
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setPrimAddress(value)
    setAddress(value)
    setCoordinates(latLng)
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  useEffect(() => {
    dispatch({ type: 'NOTIFY', payload: {} })
  }, [about])

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

    if (
      !title ||
      !description ||
      !content ||
      /* !about || */
      !updatedAbout ||
      !email ||
      !phone ||
      !category ||
      images.length === 0 ||
      county.length === 0 ||
      (category === '6097c79b9a472e0a50e1550b' && !guests)
    )
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Please add all the fields.' },
      })

    if (!address || coordinates.lat === null || coordinates.lng === null) {
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'Skriv in adressen igen och markera ett av valen i listan.',
        },
      })
    }

    if (
      county.length > 1 &&
      (category === '6097c79b9a472e0a50e1550b' ||
        category === '60aa71fb00912e43a869cf61')
    ) {
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'Du kan bara välja ett län inom inom denna kategori.',
        },
      })
    }

    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Authentication is not valid.' },
      })

    images.forEach((file) => {
      file
        .slice(0, 1) // only the first byte
        .arrayBuffer() // try to read
        .then(() => {
          // success, we should be able to send that File
          console.log('should be fine')
        })
        .catch((err) => {
          /* setImages([]) */
          return dispatch({
            type: 'NOTIFY',
            payload: {
              error:
                'Kan inte läsa fil, ladda bara upp lokala filer, dvs inte från t.ex. Google Drive.',
            },
          })
        })
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
          about: updatedAbout,
          show: show,
          images: [...imgOldURL, ...media],
          county: county,
          address: address,
          coordinates: coordinates,
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
          about: updatedAbout,
          show: show,
          images: [...imgOldURL, ...media],
          county: county,
          address: address,
          coordinates: coordinates,
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

  if (auth.user !== undefined && auth.user.role === 'admin') {
    return (
      <div>
        <Head>
          <title>Products Manager</title>
        </Head>

        <div className='py-3 contain bg-beige-lighter'>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='show'
              >
                Show product?
              </label>
              <input
                className='h-5 w-5'
                type='checkbox'
                checked={show}
                onChange={() => setShow(!show)}
                name='show'
              />
            </div>
            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='userid'
              >
                User ID:
              </label>
              <input
                type='text'
                placeholder='User ID'
                name='userid'
                value={userid}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
            </div>
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
            {category === '6097c79b9a472e0a50e1550b' ? (
              <div className=''>
                <label
                  className='block text-grey-darker text-sm font-bold my-2'
                  htmlFor='guests'
                >
                  Max antal gäster ni kan ta emot*
                </label>
                <input
                  required
                  type='text'
                  placeholder='Max antal gäster'
                  name='guests'
                  value={guests}
                  onChange={handleChangeInput}
                  className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
                />
              </div>
            ) : (
              <div className=''></div>
            )}
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
                className='shadow capitalize appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
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
                htmlFor='content'
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
                htmlFor='about'
              >
                All information* (inga bilder)
              </label>

              <div className='w-11/12 md:w-full'>
                <TextEditor
                  about={about}
                  setAbout={setAbout}
                  updatedAbout={updatedAbout}
                  setUpdatedAbout={setUpdatedAbout}
                />
              </div>
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
              {/* <AddressForm setAddress={setAddress}></AddressForm> */}
              <PlacesAutocomplete
                name='address'
                value={primAddress}
                onChange={setPrimAddress}
                onSelect={handleSelect}
                searchOptions={searchOptions}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <label
                      className='block text-grey-darker text-sm font-bold my-2'
                      htmlFor='website'
                    >
                      Adress*
                    </label>
                    <input
                      {...getInputProps({
                        placeholder: 'Sök adress och välj sedan i listan ...',
                        className:
                          'location-search-input shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker',
                      })}
                    />
                    <div className='autocomplete-dropdown-container shadow border rounded text-grey-darker'>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active py-2 px-3 shadow border'
                          : 'suggestion-item py-2 px-3 shadow border'
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' }
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>

            <div className=''>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='county'
              >
                Län*
              </label>
              <Select
                /* styles={styles} */
                placeholder='Markera det/de län som är aktuella för er...'
                /* defaultValue={(county[0])} */
                value={county.map((item) => {
                  return item
                })}
                name='county'
                id='county'
                onChange={setCounty}
                closeMenuOnSelect={false}
                isMulti
                options={County}
              />
            </div>

            <div className=''>
              <div className='my-4'>
                <label
                  htmlFor='upload'
                  className='block text-grey-darker text-sm font-bold'
                >
                  Ladda upp bilder (max 5 st, max 1Mb/bild)*
                </label>
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
                {images &&
                  images.length !== 0 &&
                  images.map((img, index) => (
                    <div
                      key={index}
                      className='img-file h-28 w-1/5 hover:opacity-75'
                    >
                      <div className='w-full h-full p-1 relative'>
                        <img
                          /* src={img.url ? img.url : (URL.srcObject = img)} */
                          src={img.url ? img.url : URL.createObjectURL(img)}
                          alt='image'
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
            <div className='socials mb-4'>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='instagram'
              >
                Instagram
              </label>
              <input
                type='text'
                placeholder='Länk till eran Instagram'
                name='instagram'
                value={instagram}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='facebook'
              >
                Facebook
              </label>
              <input
                type='text'
                placeholder='Länk till eran Facebook'
                name='facebook'
                value={facebook}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='website'
              >
                Hemsida
              </label>
              <input
                type='text'
                placeholder='Länk till eran hemsida'
                name='website'
                value={website}
                onChange={handleChangeInput}
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
              />
            </div>

            <button
              type='submit'
              className='bg-beige-normal hover:bg-beige-dark text-white font-bold py-2 px-4 rounded'
            >
              {onEdit ? 'Uppdatera' : 'Skapa'}
            </button>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className='contain'>
        <h1 className='text-center mt-32 text-5xl'>Not admin!</h1>
      </div>
    )
  }
}

export default ProductsManager
