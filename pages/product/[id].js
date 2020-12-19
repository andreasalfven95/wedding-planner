import Head from 'next/head'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getData } from '../../utils/fetchData'

const DetailProduct = (props) => {
  const [product] = useState(props.product)

  const [tab, setTab] = useState(0)

  const imgRef = useRef()

  useEffect(() => {
    const images = imgRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        'active p-2 border border-warning',
        'img-thumbnail rounded'
      )
    }

    images[tab].className =
      'img-thumbnail rounded active p-2 border border-warning'
  }, [tab])

  return (
    <div className='row detail-page'>
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className='col-md-6'>
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className='d-block img-thumbnail rounded mt-4 w-100'
          style={{ height: '350px' }}
        />

        <div className='row mx-0' style={{ cursor: 'pointer' }} ref={imgRef}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className='img-thumbnail rounded'
              style={{ height: '80px', width: '20%' }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      <div className='col-md-6'></div>
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
