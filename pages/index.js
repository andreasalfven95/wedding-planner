import Head from 'next/head'
import { getData } from '../utils/fetchData'
import { useState } from 'react'
import Products from '../components/product/Products'

export default function Home(props) {
  const [products, setProducts] = useState(props.products)

  return (
    <>
      <Head>
        <title>WedPlan | Home</title>
        <meta
          name='description'
          content='A website for all of those who are planning their big day. Here you can find venues, locations, services etc.'
        ></meta>
      </Head>
      <Products products={products} heading='Products' />
    </>
  )
}

export async function getServerSideProps() {
  const res = await getData('product')
  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, //will be passsed to the page component as props
  }
}
