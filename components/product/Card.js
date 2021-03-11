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
          /* disabled={product.inStock === 0 ? true : false} */
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
        <Button primary='true' round='true'>
          Delete
          <AiOutlineStar />
          <AiFillStar />
        </Button>
      </>
    )
  }

  return (
    <div className='card'>
      <img
        src={product.images[0].url}
        alt={product.images[0].url}
        layout='fill'
        className='card-img'
      />
      <div className='card-body bg-black'>
        <h5 className='card-title capitalize' title={product.title}>
          {product.title}
        </h5>
        <div className=''>
          <h6>${product.price}</h6>
          <h6>{product.inStock} in stock</h6>
        </div>
        <p className='card-text' title={product.description}>
          {product.description}
        </p>
        <div className='flex justify-between'>
          {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  )
}

export default Card
