import Head from 'next/head'
import { getData } from '../utils/fetchData'
import { useContext, useState, useEffect } from 'react'
import Products from '../components/product/Products'
import { DataContext } from '../store/GlobalState'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Card from '../components/product/Card'
import Filter from '../components/Filter'
import dynamic from 'next/dynamic'

/* import Map from '../components/Map' */

export default function Home(props) {
  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  })

  const [products, setProducts] = useState(props.products)
  const [productsToDisplay, setProductsToDisplay] = useState([])
  const [coordinates, setCoordinates] = useState([
    [50.505, -29.09],
    [52.505, 29.09],
  ])
  let markerBounds = []
  /* const [showAll, setShowAll] = useState(true) */

  /* const [page, setPage] = useState(1) */
  const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { auth, categories } = state

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    setProductsToDisplay(products.filter((product) => product.show === true))
  }, [products])

  /* useEffect(() => {
    console.log('Coordinates', coordinates)
  }, [coordinates]) */

  useEffect(() => {
    productsToDisplay.forEach((item) => {
      markerBounds.push([item.coordinates.lat, item.coordinates.lng])
    })
    setCoordinates(markerBounds)
    /* console.log('MarkerBounds', markerBounds) */
  }, [productsToDisplay])

  /* useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query]) */

  /* const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  } */

  const [showMap, setShowMap] = useState(false)

  return (
    <>
      <Head>
        <title>WedPlan | Home</title>
        <meta
          name='description'
          content='A website for all of those who are planning their big day. Here you can find venues, locations, services etc.'
        ></meta>
      </Head>

      <Filter state={state} />

      <div className=''>
        <button
          className='mx-auto'
          onClick={() => {
            setShowMap(!showMap)
          }}
        >
          {showMap ? 'Dölj karta' : 'Visa karta'}
        </button>
      </div>

      {showMap && productsToDisplay.length > 0 ? (
        <Map productsToDisplay={productsToDisplay} coordinates={coordinates} />
      ) : (
        <></>
      )}

      <Products
        products={products}
        productsToDisplay={productsToDisplay}
        state={state}
      />

      {/* <div className='contain bg-beige-lighter pb-4'>
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
          ) : productsToDisplay.length === 0 ? (
            <h2 className='text-3xl text-center my-40 mx-auto'>
              Inga produkter matchade sökningen.
            </h2>
          ) : (
            productsToDisplay.map((product) => (
              <>
                <Card key={product._id} product={product} />
                <h1 className='text-2xl'>Bajs</h1>
              </>
            ))
          )}
        </div>
      </div> */}
      {/* <Products products={products} heading='Products' /> */}
      {/* {props.result < page * 6 ? (
        ''
      ) : (
        <button className='block mx-auto mb-4' onClick={handleLoadMore}>
          Load more...
        </button>
      )} */}
    </>
  )
}

export async function getServerSideProps({ query }) {
  /* const page = query.page || 1 */
  const category = query.category || 'all'
  const county = query.county || 'all'
  const sort = query.sort || '-createdAt'
  const search = query.search || 'all'

  /* const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&county=${county}&sort=${sort}&title=${search}`
  ) */
  const res = await getData(
    `product?category=${category}&county=${county}&sort=${sort}&title=${search}`
  )

  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  }
}
