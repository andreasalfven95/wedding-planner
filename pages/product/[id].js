import Head from 'next/head'
import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { getData } from '../../utils/fetchData'
import { Button } from '../../components/Button'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCart, deleteItem } from '../../store/Actions'

import {
  AiOutlineMail,
  AiOutlinePhone,
  AiFillStar,
  AiOutlineInstagram,
  AiFillFacebook,
} from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { BsPersonFill } from 'react-icons/bs'
import { FaGlobeAmericas, FaMapMarkedAlt } from 'react-icons/fa'

import parse from 'html-react-parser'

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
        'bg-white opacity-25 cursor-pointer p-1'
      )
    }

    images[tab].className = 'active'
  }, [tab])

  let isAdded = false

  const checkCart = () => {
    const check = cart.every((item) => {
      return item._id !== product._id
    })

    if (!check) {
      isAdded = true
    }

    if (isAdded === false) {
      return (
        <Button
          className='w-min p-1'
          primary='true'
          onClick={() => dispatch(addToCart(product, cart))}
        >
          <HiOutlineHeart className='text-3xl p-0 min' />
        </Button>
      )
    }
    if (isAdded === true) {
      return (
        <Button
          className='w-min p-1'
          primary='true'
          onClick={() => dispatch(deleteItem(cart, product._id, 'ADD_CART'))}
        >
          <HiHeart className='text-3xl p-0 min' />
        </Button>
      )
    }
  }

  parse('<h1>single</h1>')

  return (
    <div className='detail-page pb-4 md:pt-2 contain'>
      <div className='bg-white p-3 card-container max-w-5xl mx-auto rounded-xl border border-beige-light shadow-md'>
        <Head>
          <title>
            {/* {product.title.charAt(0).toUpperCase() +
              product.title.slice(1).toLowerCase() +
              ' '} */}
            {product.title} | wed2be
          </title>
          <meta name='description' content={product.description} />
        </Head>
        <header className=' border-b border-t border-black py-2'>
          <h1 className='text-3xl md:text-5xl font-thin text-center'>
            {product.title}
          </h1>
        </header>
        <div className=''>
          <div className='h-80 flex items-center justify-center my-2'>
            <img
              src={product.images[tab].url}
              alt={product.title}
              className='block mt-2 max-h-full'
            />
          </div>

          <div className='flex flex-row justify-center max-w-2xl' ref={imgRef}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={product.title + ' ' + (index + 1)}
                className='bg-white opacity-25 cursor-pointer p-1'
                style={{ height: '80px', width: '20%' }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
        {/* BIG SCREEN: Picture to left, information to right */}
        <div className='col-md-6'>
          <div className='information pt-2 border-b border-black mb-4'>
            <h2 className='text-lg font-medium pb-2'>{product.description}</h2>
            <p className='leading-6 italic pb-3 font-extralight'>
              {product.content}
            </p>
            <div className='about leading-6'>{parse(product.about)}</div>
          </div>
        </div>
        <div className='company-info justify-end break-all text-base'>
          <ul className=''>
            <div className='information mb-4 pb-2 border-b'>
              {product.email && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <AiOutlineMail></AiOutlineMail>
                    </div>
                    <a
                      className='hover:underline'
                      href={`mailto:${product.email}`}
                    >
                      {product.email}
                    </a>
                  </div>
                </li>
              )}

              {product.phone && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <AiOutlinePhone></AiOutlinePhone>
                    </div>
                    <a
                      className='hover:underline'
                      href={`tel:${product.phone}`}
                    >
                      {product.phone}
                    </a>
                  </div>
                </li>
              )}

              {product.address && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <FaMapMarkedAlt />
                    </div>
                    <div className='inline-block'>
                      <a
                        className='hover:underline'
                        target='blank'
                        href={`http://maps.google.com/?q=${product.address}`}
                      >
                        {product.address}
                      </a>
                    </div>
                  </div>
                </li>
              )}

              {product.guests && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <BsPersonFill></BsPersonFill>
                    </div>
                    <div className='inline-block'>
                      <p>Max {product.guests} gäster</p>
                    </div>
                  </div>
                </li>
              )}

              {product.rating !== 0 && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <AiFillStar />
                    </div>
                    <div className='inline-block'>
                      <p>{product.rating}</p>
                    </div>
                  </div>
                </li>
              )}

              {product.county && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <ImLocation />
                    </div>
                    <div className='inline-block'>
                      {product.county.length >= 21 ? (
                        <p className=''>Hela Sverige</p>
                      ) : (
                        <>
                          {product.county.map((item) => (
                            <div key={item.value} className='mr-1 inline-block'>
                              {item.label}
                              {product.county.length > 1 ? (
                                <div className='ml-1 inline-block'>|</div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              )}
            </div>
            <div className='socials'>
              {product.website && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <FaGlobeAmericas />
                    </div>
                    <div className='inline-block'>
                      <a
                        target='blank'
                        href={product.website}
                        className='hover:underline'
                      >
                        {product.website}
                      </a>
                    </div>
                  </div>
                </li>
              )}

              {product.instagram && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <AiOutlineInstagram />
                    </div>
                    <div className='inline-block'>
                      <a
                        target='blank'
                        href={product.instagram}
                        className='hover:underline'
                      >
                        {product.instagram}
                      </a>
                    </div>
                  </div>
                </li>
              )}

              {product.facebook && (
                <li>
                  <div className='flex items-center mb-1'>
                    <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                      <AiFillFacebook />
                    </div>
                    <div className='inline-block'>
                      <a
                        target='blank'
                        href={product.facebook}
                        className='hover:underline'
                      >
                        {product.facebook}
                      </a>
                    </div>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
        <div className='flex justify-end'>{checkCart()}</div>
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
