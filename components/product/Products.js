import React from 'react'
import Link from 'next/link'
import Card from './Card'

import Head from 'next/head'
/* import { getData } from '../utils/fetchData'
import { DataContext } from '../store/GlobalState'
import filterSearch from '../utils/filterSearch'
import Filter from '../components/Filter' */
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Products({ products, state, productsToDisplay }) {
  const { auth } = state

  const [showAll, setShowAll] = useState(true)

  return (
    <div className='contain bg-beige-lighter pb-4'>
      <div className='flex flex-wrap -mx-1 lg:-mx-4'>
        {auth.user !== undefined && auth.user.role === 'admin' ? (
          products.length === 0 ? (
            <h2 className='text-3xl text-center my-40 mx-auto'>
              Inga produkter matchade sökningen.
            </h2>
          ) : (
            <>
              <input
                className='h-5 w-5'
                type='checkbox'
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
              />
              {showAll
                ? products.map((product) => (
                    <Card key={product._id} product={product} />
                  ))
                : productsToDisplay.map((product) => (
                    <Card key={product._id} product={product} />
                  ))}
            </>
          )
        ) : productsToDisplay === undefined ||
          productsToDisplay.length === 0 ? (
          <h2 className='text-3xl text-center my-40 mx-auto'>
            Inga produkter matchade sökningen.
          </h2>
        ) : (
          productsToDisplay.map((product) => (
            <>
              <Card key={product._id} product={product} />
            </>
          ))
        )}
      </div>
    </div>
  )
}

export default Products
