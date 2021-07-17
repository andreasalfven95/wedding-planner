import Image from 'next/image'
import { Button } from '../Button'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart, deleteItem } from '../../store/Actions'
import { useState } from 'react'

import { VscGlobe } from 'react-icons/vsc'
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

const Card = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

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

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`} passHref>
          <Button primary='true' className='mr-2'>
            Läs mer...
          </Button>
        </Link>
        {checkCart()}
      </>
    )
  }

  const adminLink = () => {
    return (
      <>
        <input
          className='h-5 w-5'
          type='checkbox'
          disabled
          defaultChecked={product.show}
          name='show'
        />
        <Link href={`/create/${product._id}`} passHref>
          <Button primary='true'>Edit</Button>
        </Link>
        <Button
          primary='true'
          onClick={() =>
            dispatch({
              type: 'ADD_MODAL',
              payload: [
                {
                  data: '',
                  id: product._id,
                  title: product.title,
                  type: 'DELETE_PRODUCT',
                },
              ],
            })
          }
        >
          Delete
        </Button>
      </>
    )
  }

  return (
    <div className='transition bg-white p-3 mt-4 card-container rounded-xl border border-beige-light shadow-md hover:shadow-lg flex-col w-full md:flex-row md:text-left'>
      {/* <div className='bg-white p-2 my-4 card-container 
    border-t border-b border-black shadow-xl transition-shadow 
    flex-col w-full md:flex-row md:text-left'> */}
      <div className='w-full lg:pb-4 lg:border-b lg:border-black lg:mb-3'>
        <header className='border-b border-black mb-2 pb-2 lg:mb-4 lg:flex lg:flex-row lg:justify-between lg:items-center'>
          <h2 className='text-3xl capitalize'>{product.title}</h2>
          {/* <div className='hidden lg:flex justify-self-end'>
              {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
          </div> */}
        </header>
        <div className='flex-col flex mb-2 lg:m-0 lg:flex-row'>
          <div className='imageContainer m-0 lg:flex lg:flex-col lg:items-center justify-center'>
            <img
              src={product.images[0].url}
              alt={product.images[0].url}
              layout='fill'
              /* className='image' */
              /* layout='fill'
              objectFit='cover' */
              className='block max-h-80 md:max-w-sm mx-auto lg:max-h-80 lg:m-0 h-full'
            />
          </div>
          <div className='information py-2 border-b border-black lg:border-none lg:pl-4 lg:p-0'>
            <h3 className='text-lg lg:text-xl lg:pb-4 pb-1 uppercase'>{product.description}</h3>
            <p className='text-sm leading-6'>{product.content}</p>

            <div className='hidden company-info justify-end break-all text-base mt-4 lg:block'>
        <ul className=''>
          <div className='information'>
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
                  <a className='hover:underline' href={`tel:${product.phone}`}>
                    {product.phone}
                  </a>
                </div>
              </li>
            )}

            {/* {product.address && (
              <li>
                <div className='flex items-center mb-1'>
                  <FaMapMarkedAlt className='text-beige-normal inline-block mr-4 self-start mt-1' />
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
            )} */}

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

            {product.rating === 0 && (
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
            {product.county && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <ImLocation />
                  </div>
                  <div className='inline-block'>
                    {product.county.length >= 21 ? (
                      <p className='mr-2'>Hela Sverige</p>
                    ) : (
                      product.county.map((item) => (
                        <div key={item.value} className='mr-2 inline-block'>
                          {item.label}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </li>
            )}
          </div>
        </ul>
      </div>
          </div>
        </div>
      </div>

      <div className='company-info justify-end break-all text-base lg:hidden'>
        <ul className=''>
          <div className='information mb-2 pb-2 border-b'>
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
                  <a className='hover:underline' href={`tel:${product.phone}`}>
                    {product.phone}
                  </a>
                </div>
              </li>
            )}

            {/* {product.address && (
              <li>
                <div className='flex items-center mb-1'>
                  <FaMapMarkedAlt className='text-beige-normal inline-block mr-4 self-start mt-1' />
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
            )} */}

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

            {product.rating === 0 && (
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
            {product.county && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <ImLocation />
                  </div>
                  <div className='inline-block'>
                    {product.county.length >= 21 ? (
                      <p className='mr-2'>Hela Sverige</p>
                    ) : (
                      product.county.map((item) => (
                        <div key={item.value} className='mr-2 inline-block'>
                          {item.label}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </li>
            )}
          </div>
        </ul>
      </div>

      <div className='mt-2'>
        <div className='flex justify-end'>
          {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  )
}

export default Card
