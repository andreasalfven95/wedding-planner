import Head from 'next/head'
import { getData } from '../utils/fetchData'
import { useContext, useState, useEffect } from 'react'
import Products from '../components/product/Products'
import { DataContext } from '../store/GlobalState'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Card from '../components/product/Card'
import Filter from '../components/Filter'

export default function Home(props) {
  const [products, setProducts] = useState(props.products)

  const [page, setPage] = useState(1)
  const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

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

      <div className='container mx-auto'>
        {/* <div className='text-center mb-8 text-5xl text-black'>{heading}</div> */}
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
          {products.length === 0 ? (
            <h2>No products.</h2>
          ) : (
            products.map((product) => (
              <Card key={product._id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* <Products products={products} heading='Products' /> */}
      {props.result < page * 6 ? (
        ''
      ) : (
        <button className='block mx-auto mb-4' onClick={handleLoadMore}>
          Load more...
        </button>
      )}
    </>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  }
}
