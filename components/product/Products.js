import React from 'react'
import Link from 'next/link'
import Card from './Card'

function Products({ products, heading }) {
  return (
    <div className='contain mx-auto'>
      <div className='text-center mb-8 text-5xl text-black'>{heading}</div>
      <div className='flex flex-wrap -mx-1 lg:-mx-4'>
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
      </div>
    </div>
  )
}

export default Products
