import Link from 'next/link'
import { Button } from '../components/Button'
import { deleteItem } from '../store/Actions'
import { ImLocation } from 'react-icons/im'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { VscGlobe } from 'react-icons/vsc'
import { FiTrash } from 'react-icons/fi'

/* MAKE ALL ITEM SMALLER, LIKE A LIST OF ITEMS? */
const CartItem = ({ item, dispatch, cart }) => {
  const handleDelete = () => {
    dispatch(deleteItem(cart, item._id, 'ADD_CART'))
  }

  return (
    <div className='p-2 border-t border-b mt-8 card-container border-black shadow-xl transition-shadow flex-col w-full md:flex-row md:text-left'>
      <div className='w-full'>
        <header className=' border-b border-black mb-2 pb-2'>
          <h2 className='text-3xl capitalize'>{item.title}</h2>
        </header>
        <div className='flex-col'>
          <img
            src={item.images[0].url}
            alt={item.images[0].url}
            layout='fill'
            className='block max-h-80 md:max-w-sm mx-auto md:m-0'
          />
          <div className='information py-2 border-b border-black mb-2'>
            <h3 className='text-lg pb-1'>{item.description}</h3>
            <p className='text-sm leading-6'>{item.content}</p>
          </div>
        </div>
      </div>
      <div className='company-info justify-end break-words'>
        <ul className=''>
          <li>
            <div className='flex items-center mb-1'>
              <AiOutlineMail className='inline-block mr-2'> </AiOutlineMail>
              test@gmail.com
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <AiOutlinePhone className='inline-block mr-2'> </AiOutlinePhone>
              0761857993
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <VscGlobe className='inline-block mr-2'></VscGlobe>
              <a
                href='https://andreasalfven95.github.io/portfolio/'
                className='hover:underline'
              >
                https://andreasalfven95.github.io/portfolio/
              </a>
            </div>
          </li>
          <li>
            <div className='flex items-center mb-1'>
              <ImLocation className='inline-block mr-2 self-start mt-1' />
              <div className='inline-block'>
                <p>Fyrislundsgatan 26</p>
                <p>754 46 Uppsala</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className='mt-2'>
        <div className='flex justify-end'>
          <Link href={`/product/${item._id}`} passHref>
            <Button primary='true' className='mr-2'>
              Läs mer...
            </Button>
          </Link>
          <Button
            className='w-min p-0 px-2'
            primary='true'
            onClick={handleDelete}
          >
            <FiTrash className='text-xl' />
          </Button>
        </div>
      </div>
    </div>

    /* 
        <div className='flex flex-row justify-between items-center'>
          <Link href={`/item/${item._id}`} passHref>
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
    </div> */
  )
}

export default CartItem
