import Head from 'next/head'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getData } from '../../utils/fetchData'
import { Button } from '../../components/Button'
import Link from 'next/link'

const DetailProduct = (props) => {
  const [product] = useState(props.product)

  const [tab, setTab] = useState(0)

  const imgRef = useRef()

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
    <div className='detail-page'>
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className='col-md-6'>
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className='block mt-4 w-max'
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
      <div className='col-md-6 mt-3'>
        <h2 className='uppercase'>{product.title}</h2>
        <h5 className='uppercase'>${product.price}</h5>
        <div className='flex flex-row mx-0 justify-between'>
          {product.inStock}
          <h6>Sold: {product.sold}</h6>
        </div>
        <div className='my-2'>{product.description}</div>
        <div className='my-2'>{product.content}</div>
        <Link href='/signin' passHref>
          <Button className='w-min' primary='true'>
            Add to favourites
          </Button>
        </Link>
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
