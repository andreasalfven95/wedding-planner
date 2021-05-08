import Head from 'next/head'
import React from 'react'
import { ImLocation } from 'react-icons/im'
import { useState, useContext, useEffect, useRef } from 'react'
import { getData } from '../../utils/fetchData'
import { Button } from '../../components/Button'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCart, deleteItem } from '../../store/Actions'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { VscGlobe } from 'react-icons/vsc'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

const DetailProduct = (props) => {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)
  const imgRef = useRef()

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  useEffect(() => {
    const images = imgRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        'active',
        'bg-white opacity-25 p-1'
      )
    }

    images[tab].className = 'active'
  }, [tab])

  let isAdded = false

  const checkCart = () => {
    const check = cart.every((item) => {
      return item._id !== product._id
    })

    if (!check) {
      isAdded = true
    }

    if (isAdded === false) {
      return (
        <Button
          className='w-min p-1'
          primary='true'
          onClick={() => dispatch(addToCart(product, cart))}
        >
          <HiOutlineHeart className='text-3xl p-0 min' />
        </Button>
      )
    }
    if (isAdded === true) {
      return (
        <Button
          className='w-min p-1'
          primary='true'
          onClick={() => dispatch(deleteItem(cart, product._id, 'ADD_CART'))}
        >
          <HiHeart className='text-3xl p-0 min' />
        </Button>
      )
    }
  }

  return (
    <div className='detail-page pb-4'>
      <Head>
        <title>{product.title}</title>
      </Head>
      <header className=' border-b border-t border-black py-2'>
        <h2 className='text-3xl capitalize'>{product.title}</h2>
      </header>
      <div className=''>
        <div className='h-72 flex items-center justify-center mb-2'>
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className='block mt-2 max-h-full'
          />
        </div>

        <div className='flex flex-row cursor-pointer' ref={imgRef}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className='bg-white opacity-25 p-1'
              style={{ height: '80px', width: '20%' }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      {/* BIG SCREEN: Picture to left, information to right */}
      <div className='col-md-6'>
        <div className='information py-2 border-b border-black mb-3'>
          <h3 className='text-lg font-medium pb-2'>{product.description}</h3>
          <p className='leading-6 italic pb-3 font-extralight'>
            {product.content}
          </p>
          <p className='leading-6'>
            {' '}
            {/* {product.about} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            possimus quasi officiis iste iusto! Quae nostrum perferendis sequi
            expedita neque, incidunt consequuntur maiores architecto dolorum
            quos aliquam repudiandae commodi sapiente! Eligendi delectus
            accusantium illo praesentium molestiae cum exercitationem est
            officia maiores laboriosam? Nihil praesentium esse aspernatur
            impedit sit eius nemo illum repellat eaque obcaecati neque odio
            consequatur, veritatis laudantium inventore? Corrupti minus laborum
            eveniet cum, quae at a consequuntur distinctio harum quidem vero est
            recusandae necessitatibus. Vero rem nulla hic voluptates neque
            voluptas nemo nihil, omnis ipsa ab impedit aliquid. Sapiente ratione
            facilis nemo dolores non, facere neque quam voluptate deserunt
            maiores velit maxime unde magnam dicta libero officia quae eum
            perferendis, adipisci odit? Explicabo id nobis cum error temporibus!
            Itaque, numquam natus consequatur accusantium exercitationem nobis
            quaerat laboriosam ipsum esse porro unde sit quae quasi sint.
            Aperiam veniam ut, esse earum minima expedita perspiciatis pariatur
            est exercitationem praesentium eos? Illum impedit quos voluptatibus
            ipsum accusantium quas autem? Molestias temporibus esse ipsam odit
            error hic reprehenderit expedita iusto. Vel at provident laborum
            cumque deleniti fuga sunt, cupiditate asperiores dolor quis?
          </p>
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
      <div className='flex justify-end'>{checkCart()}</div>
    </div>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`)
  //server side rendering
  return {
    props: { product: res.product }, //will be passsed to the page component as props
  }
}

export default DetailProduct
