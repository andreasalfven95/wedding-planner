import Image from 'next/image'
import { ImLocation } from 'react-icons/im'
import { Button } from '../Button'
import Link from 'next/link'
import styled from 'styled-components'
import React from 'react'

const Card = ({ product }) => {
  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`} passHref>
          <Button primary='true' round='true'>
            View
          </Button>
        </Link>
        <Link href={`/product/${product._id}`} passHref>
          <Button primary='true' round='true'>
            Add to favourites
          </Button>
        </Link>
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
        <div className='flex justify-between'>{userLink()}</div>
      </div>
    </div>

    /* <ProductCard>
      <ProductImg
        src={product.images[0].url}
        alt={product.images[0].url}
        layout='fill'
      />
      <ProductInfo>
        <TextWrap>
          <ImLocation />
          <ProductTitle
            css={`
              text-transform: capitalize;
            `}
          >
            ${product.price} {product.title}, {product.inStock} in stock
          </ProductTitle>
        </TextWrap>
        <Link href={`/product/${product._id}`} passHref>
          <Button
            primary='true'
            round='true'
            css={`
              position: absolute;
              top: 410px;
              font-size: 14px;
            `}
          >
            View
          </Button>
        </Link>
      </ProductInfo>
    </ProductCard> */
  )
}

export default Card

const ProductCard = styled.div`
  line-height: 2;
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 10px;
  transition: 0.2 ease;
`

const ProductImg = styled(Image)`
  height: 100%;
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  filter: brightness(70%);
  transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: brightness(100%);
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem;

  @media screen and (max-width: 280px) {
    padding: 0 1rem;
  }
`

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 375px;
`

const ProductTitle = styled.div`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 0.5rem;
`
