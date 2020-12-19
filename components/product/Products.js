import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Card from './Card'

function Products({ products, heading }) {
  return (
    <ProductsContainer>
      <ProductsHeading>{heading}</ProductsHeading>
      <ProductWrapper>
        {products.length === 0 ? (
          <h2
            style={{
              color: '#000',
            }}
          >
            No products.
          </h2>
        ) : (
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        )}
      </ProductWrapper>
    </ProductsContainer>
  )
}

export default Products

const ProductsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem calc((100vw - 1300px) / 2);
  color: #fff;
`

const ProductsHeading = styled.div`
  font-size: clamp(1.2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 2rem;
  color: #000;
`

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-items: center;
  padding: 0 2rem;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
