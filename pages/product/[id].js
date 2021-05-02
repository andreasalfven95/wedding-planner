import Head from 'next/head'
import React from 'react'
import { ImLocation } from 'react-icons/im'
import { useState, useContext, useEffect, useRef } from 'react'
import { getData } from '../../utils/fetchData'
import { Button } from '../../components/Button'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const DetailProduct = (props) => {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)
  const imgRef = useRef()

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  useEffect(() => {
    const images = imgRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        'active',
        'bg-white opacity-25 p-1'
      )
    }

    images[tab].className = 'active'
  }, [tab])

  return (
    <div className='detail-page pb-4'>
      <Head>
        <title>{product.title}</title>
      </Head>
      <header className=' border-b border-t border-black mb-2 py-2'>
        <h2 className='text-3xl capitalize'>{product.title}</h2>
      </header>
      <div className='col-md-6'>
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className='block mt-2 w-max'
          style={{ height: '350px' }}
        />

        <div
          className='flex flex-row mt-1'
          style={{ cursor: 'pointer' }}
          ref={imgRef}
        >
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className='bg-white opacity-25 p-1'
              style={{ height: '80px', width: '20%' }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      {/* BIG SCREEN: Picture to left, information to right */}
      <div className='col-md-6'>
        <div className='information py-4 border-b border-black mb-4'>
          <h3 className='text-lg pb-2'>{product.description}</h3>
          <p className='text-sm leading-6'>{product.content}</p>
        </div>

        <Button
          className='w-min'
          primary='true'
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Add to favourites
          <AiOutlineStar />
          <AiFillStar />
        </Button>
      </div>
      <div className='company-info justify-end'>
        <ul className=''>
          <li>0761857993</li>
          <li>
            <a href='https://andreasalfven95.github.io/portfolio/'>
              https://andreasalfven95.github.io/portfolio/
            </a>
          </li>
          <li>
            <ImLocation> </ImLocation> Fyrislundsgatan 26 <br /> 754 46 Uppsala
          </li>
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`)
  //server side rendering
  return {
    props: { product: res.product }, //will be passsed to the page component as props
  }
}

export default DetailProduct
