import Image from 'next/image'
import { ImLocation } from 'react-icons/im'
import { Button } from '../Button'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const Card = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`} passHref>
          <Button primary='true' round='true'>
            View
          </Button>
        </Link>
        <Button
          primary='true'
          round='true'
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Add to favourites
          <AiOutlineStar />
          <AiFillStar />
        </Button>
      </>
    )
  }

  const adminLink = () => {
    return (
      <>
        <Link href={`/create/${product._id}`} passHref>
          <Button primary='true' round='true'>
            Edit
          </Button>
        </Link>
        <Button
          primary='true'
          round='true'
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
          <AiOutlineStar />
          <AiFillStar />
        </Button>
      </>
    )
  }

  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'>
      <div className='overflow-hidden rounded-lg shadow-lg'>
        <img
          src={product.images[0].url}
          alt={product.images[0].url}
          layout='fill'
          className='block h-auto w-full'
        />
        <header className='flex items-center justify-between leading-tight p-2 md:p-4'>
          <div className='text-lg'>{product.title}</div>
          <p className='flex text-grey-darker text-sm'>
            <ImLocation> </ImLocation> 14/4/19
          </p>
        </header>
        {/* <div classNameName=''>
          <h6>${product.price}</h6>
          <h6>{product.inStock} in stock</h6>
        </div> */}
        <footer className='flex items-center justify-between leading-none p-2 md:p-4'>
          <div className='flex items-center'>
            <p class='text-gray-700 text-base' title={product.description}>
              {product.description}
            </p>
          </div>
        </footer>
        <div class='px-3 pb-2'>
          <div class='flex justify-between'>
            {!auth.user || auth.user.role !== 'admin'
              ? userLink()
              : adminLink()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
