import Head from 'next/head'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'

export default function Cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  if (cart.length === 0)
    return (
      <>
        <Head>
          <title>wed2be | Favoriter</title>
        </Head>
        <h2 className='text-5xl font-light text-center my-60'>
          Inga sparade favoriter.
        </h2>
      </>
    )

  return (
    <div className='contain bg-beige-lighter'>
      <Head>
        <title>wed2be | Favoriter</title>
      </Head>

      <div className=''>
        <h2 className='uppercase text-xl text-center'>Favoriter:</h2>

        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            dispatch={dispatch}
            cart={cart}
          />
        ))}
      </div>

      <div className='grid-cols-4'></div>
    </div>
  )
}
