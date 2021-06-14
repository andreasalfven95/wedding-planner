import Image from 'next/image'
import { ImLocation } from 'react-icons/im'
import { Button } from '../Button'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart, deleteItem } from '../../store/Actions'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { VscGlobe } from 'react-icons/vsc'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useState } from 'react'

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
    <div className='p-2 border-t border-b mt-8 card-container border-black shadow-xl transition-shadow flex-col w-full md:flex-row md:text-left'>
      <div className='w-full'>
        <header className=' border-b border-black mb-2 pb-2'>
          <h2 className='text-3xl capitalize'>{product.title}</h2>
        </header>
        <div className='flex-col'>
          <div className='imageContainer'>
            <img
              src={product.images[0].url}
              alt={product.images[0].url}
              layout='fill'
              /* className='image' */
              /* layout='fill'
              objectFit='cover' */
              className='block max-h-80 md:max-w-sm mx-auto md:m-0'
            />
          </div>
          <div className='information py-2 border-b border-black mb-2'>
            <h3 className='text-lg pb-1'>{product.description}</h3>
            <p className='text-sm leading-6'>{product.content}</p>
          </div>
        </div>
      </div>
      <div className='company-info justify-end break-words'>
        <ul className=''>
          <li>
            <div className='flex items-center mb-1'>
              <AiOutlineMail className='inline-block mr-2'> </AiOutlineMail>
              test@gmail.com
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <AiOutlinePhone className='inline-block mr-2'> </AiOutlinePhone>
              0761857993
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <VscGlobe className='inline-block mr-2'></VscGlobe>
              <a
                href='https://andreasalfven95.github.io/portfolio/'
                className='hover:underline'
              >
                https://andreasalfven95.github.io/portfolio/
              </a>
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <ImLocation className='inline-block mr-2 self-start mt-1' />
              <div className='inline-block'>
                <p>{product.address}</p>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <ImLocation className='inline-block mr-2 self-start mt-1' />
              <div className='inline-block'>
                {product.county.length >= 21 ? (
                  <p className='mr-2'>Hela Sverige</p>
                ) : (
                  product.county.map((item) => (
                    <p key={item.value} className='mr-2'>
                      {item.label}
                    </p>
                  ))
                )}
              </div>
            </div>
          </li>
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
