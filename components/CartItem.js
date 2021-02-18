import Link from 'next/link'
import { Button } from '../components/Button'
import { RiDeleteBinLine } from 'react-icons/ri'
import { deleteItem } from '../store/Actions'

/* MAKE ALL ITEM SMALLER, LIKE A LIST OF ITEMS? */
const CartItem = ({ item, dispatch, cart }) => {
  const handleDelete = () => {
    dispatch(deleteItem(cart, item._id, 'ADD_CART'))
  }

  return (
    <div className='card text-white mx-auto'>
      <img
        src={item.images[0].url}
        alt={item.images[0].url}
        layout='fill'
        className='card-img mx-auto'
      />
      <div className='card-body bg-black p-2'>
        <h5 className='card-title capitalize' title={item.title}>
          {item.title}
        </h5>
        <div className=''>
          <h6>${item.price}</h6>
          <h6>{item.inStock} in stock</h6>
        </div>
        <p className='card-text' title={item.description}>
          {item.description}
        </p>
        <div className='flex flex-row justify-between items-center'>
          <Link href={`/product/${item._id}`} passHref>
            <Button primary='true' round='true'>
              View
            </Button>
          </Link>
          <RiDeleteBinLine
            className='text-2xl cursor-pointer'
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
