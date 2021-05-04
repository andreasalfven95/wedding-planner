import Image from 'next/image'
import { ImLocation } from 'react-icons/im'
import { Button } from '../Button'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart, deleteItem } from '../../store/Actions'
import { AiOutlineStar, AiFillStar, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { VscGlobe } from 'react-icons/vsc'

const Card = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  let isAdded = false;


  const checkCart = () => {
    const check = cart.every((item) => {
      return item._id !== product._id
    })
  
    if (!check){
      isAdded = true
    }

    if (isAdded === false) {
      return(
        <Button
          className='w-min p-1'
          primary='true'
          onClick={() => dispatch(addToCart(product, cart))}
        >
          <AiOutlineStar className='text-3xl p-0 min' />
        </Button>
      )
    } if(isAdded === true) {
      return(
        <Button
          className='w-min p-1'
          primary='true'
          onClick={
            () => /* dispatch(addToCart(product, cart)) */
            dispatch(deleteItem(cart, product._id, 'ADD_CART'))
          }
        >
          <AiFillStar className='text-3xl p-0 min' />
        </Button>
      )
    }
  }

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`} passHref>
          <Button primary='true'>Läs mer...</Button>
        </Link>
        {checkCart()}
      </>
    )
  }

  const adminLink = () => {
    return (
      <>
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
    <div className='bg-gray-100 pb-2 mt-6 my-2 card-container border-black shadow-xl transition-shadow flex-col w-full md:flex-row md:text-left'>
      <div className='w-full'>
        <header className=' border-b border-t border-black mb-2 py-2'>
          <h2 className='text-3xl capitalize'>{product.title}</h2>
        </header>
        <div className='flex-col'>
          <img
            src={product.images[0].url}
            alt={product.images[0].url}
            layout='fill'
            className='block sm:max-h-56 mx-auto md:m-0'
          />
          <div className='information py-2 border-b border-black mb-2'>
            <h3 className='text-lg pb-1'>{product.description}</h3>
            <p className='text-sm leading-6'>{product.content}</p>
          </div>
        </div>
      </div>
      <div className='company-info justify-end'>
        <ul className=''>
          <li>
            <AiOutlineMail className="inline-block"> </AiOutlineMail> test@gmail.com
          </li>
          <li>
            <AiOutlinePhone className="inline-block"> </AiOutlinePhone> 0761857993
          </li>
          <li>
            <a href='https://andreasalfven95.github.io/portfolio/'>
              <VscGlobe className="inline-block"></VscGlobe> https://andreasalfven95.github.io/portfolio/
            </a>
          </li>
          <li>
            <ImLocation className="inline-block"> </ImLocation> Fyrislundsgatan 26 <br /> 754 46 Uppsala
          </li>
        </ul>
        <div className='mt-2'>
          <div className='flex justify-between'>
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
