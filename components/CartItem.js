import Link from 'next/link'
import { Button } from '../components/Button'
import { deleteItem } from '../store/Actions'

import { FiTrash } from 'react-icons/fi'
import { VscGlobe } from 'react-icons/vsc'
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiFillStar,
  AiOutlineInstagram,
  AiFillFacebook,
} from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { BsPersonFill } from 'react-icons/bs'
import { FaGlobeAmericas, FaMapMarkedAlt } from 'react-icons/fa'

/* MAKE ALL ITEM SMALLER, LIKE A LIST OF ITEMS? */
const CartItem = ({ item, dispatch, cart }) => {
  const handleDelete = () => {
    dispatch(deleteItem(cart, item._id, 'ADD_CART'))
  }

  return (
    <div className='transition bg-white p-3 mt-4 card-container rounded-xl border border-beige-light shadow-md hover:shadow-lg flex-col w-full md:flex-row md:text-left'>
      {/* <div className='bg-white p-2 my-4 card-container 
    border-t border-b border-black shadow-xl transition-shadow 
    flex-col w-full md:flex-row md:text-left'> */}
      <div className='w-full lg:pb-4 lg:border-b lg:border-black lg:mb-3'>
        <header className='border-b border-black mb-2 pb-2 lg:mb-4 lg:flex lg:flex-row lg:justify-between lg:items-center'>
          <h2 className='text-3xl'>{item.title}</h2>
          {/* <div className='hidden lg:flex justify-self-end'>
              {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
          </div> */}
        </header>
        <div className='flex-col flex mb-2 lg:m-0 lg:flex-row'>
          <div className='imageContainer m-0 lg:flex lg:flex-col lg:items-center justify-center'>
            <img
              src={item.images[0].url}
              alt={item.title}
              layout='fill'
              /* className='image' */
              /* layout='fill'
              objectFit='cover' */
              className='block max-h-80 md:max-w-sm mx-auto lg:max-h-80 lg:m-0 h-full'
            />
          </div>
          <div className='information py-2 border-b border-black lg:border-none lg:pl-4 lg:p-0'>
            <h3 className='text-lg lg:text-xl lg:pb-4 pb-1 uppercase'>
              {item.description}
            </h3>
            <p className='text-sm leading-6'>{item.content}</p>

            <div className='hidden company-info justify-end break-all text-base mt-4 lg:block'>
              <ul className=''>
                <div className='information'>
                  {item.email && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <AiOutlineMail></AiOutlineMail>
                        </div>
                        <a
                          className='hover:underline'
                          href={`mailto:${item.email}`}
                        >
                          {item.email}
                        </a>
                      </div>
                    </li>
                  )}

                  {item.phone && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <AiOutlinePhone></AiOutlinePhone>
                        </div>
                        <a
                          className='hover:underline'
                          href={`tel:${item.phone}`}
                        >
                          {item.phone}
                        </a>
                      </div>
                    </li>
                  )}

                  {/* {item.address && (
              <li>
                <div className='flex items-center mb-1'>
                  <FaMapMarkedAlt className='text-beige-normal inline-block mr-4 self-start mt-1' />
                  <div className='inline-block'>
                    <a
                      className='hover:underline'
                      target='blank'
                      href={`http://maps.google.com/?q=${item.address}`}
                    >
                      {item.address}
                    </a>
                  </div>
                </div>
              </li>
            )} */}

                  {item.guests && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <BsPersonFill></BsPersonFill>
                        </div>
                        <div className='inline-block'>
                          <p>Max {item.guests} gäster</p>
                        </div>
                      </div>
                    </li>
                  )}

                  {item.rating !== 0 && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <AiFillStar />
                        </div>
                        <div className='inline-block'>
                          <p>{item.rating}</p>
                        </div>
                      </div>
                    </li>
                  )}

                  {item.website && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <FaGlobeAmericas />
                        </div>
                        <div className='inline-block'>
                          <a
                            target='blank'
                            href={item.website}
                            className='hover:underline'
                          >
                            {item.website}
                          </a>
                        </div>
                      </div>
                    </li>
                  )}
                  {item.county && (
                    <li>
                      <div className='flex items-center mb-1'>
                        <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                          <ImLocation />
                        </div>
                        <div className='inline-block'>
                          {item.county.length >= 21 ? (
                            <p className='mr-2'>Hela Sverige</p>
                          ) : (
                            <>
                              {item.county.map((product) => (
                                <div
                                  key={product.value}
                                  className='mr-1 inline-block'
                                >
                                  {product.label}
                                  {item.county.length > 1 ? (
                                    <div className='ml-1 inline-block'>|</div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='company-info justify-end break-all text-base lg:hidden'>
        <ul className=''>
          <div className='information mb-2 pb-2 border-b'>
            {item.email && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <AiOutlineMail></AiOutlineMail>
                  </div>
                  <a className='hover:underline' href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </div>
              </li>
            )}

            {item.phone && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <AiOutlinePhone></AiOutlinePhone>
                  </div>
                  <a className='hover:underline' href={`tel:${item.phone}`}>
                    {item.phone}
                  </a>
                </div>
              </li>
            )}

            {/* {item.address && (
              <li>
                <div className='flex items-center mb-1'>
                  <FaMapMarkedAlt className='text-beige-normal inline-block mr-4 self-start mt-1' />
                  <div className='inline-block'>
                    <a
                      className='hover:underline'
                      target='blank'
                      href={`http://maps.google.com/?q=${item.address}`}
                    >
                      {item.address}
                    </a>
                  </div>
                </div>
              </li>
            )} */}

            {item.guests && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <BsPersonFill></BsPersonFill>
                  </div>
                  <div className='inline-block'>
                    <p>Max {item.guests} gäster</p>
                  </div>
                </div>
              </li>
            )}

            {item.rating !== 0 && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <AiFillStar />
                  </div>
                  <div className='inline-block'>
                    <p>{item.rating}</p>
                  </div>
                </div>
              </li>
            )}

            {item.website && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <FaGlobeAmericas />
                  </div>
                  <div className='inline-block'>
                    <a
                      target='blank'
                      href={item.website}
                      className='hover:underline'
                    >
                      {item.website}
                    </a>
                  </div>
                </div>
              </li>
            )}
            {item.county && (
              <li>
                <div className='flex items-center mb-1'>
                  <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                    <ImLocation />
                  </div>
                  <div className='inline-block'>
                    {item.county.length >= 21 ? (
                      <p className='mr-2'>Hela Sverige</p>
                    ) : (
                      <>
                        {item.county.map((product) => (
                          <div
                            key={product.value}
                            className='mr-1 inline-block'
                          >
                            {product.label}
                            {item.county.length > 1 ? (
                              <div className='ml-1 inline-block'>|</div>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </li>
            )}
          </div>
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

    //     <div className='transition bg-white p-3 my-4 card-container rounded-xl border border-beige-light shadow-md hover:shadow-lg flex-col w-full md:flex-row md:text-left'>
    //       {/* <div className='bg-white p-2 my-4 card-container
    //     border-t border-b border-black shadow-xl transition-shadow
    //     flex-col w-full md:flex-row md:text-left'> */}
    //       <div className='w-full'>
    //         <header className=' border-b border-black mb-2 pb-2'>
    //           <h2 className='text-3xl capitalize'>{item.title}</h2>
    //         </header>
    //         <div className='flex-col'>
    //           <div className='imageContainer'>
    //             <img
    //               src={item.images[0].url}
    //               alt={item.images[0].url}
    //               layout='fill'
    //               /* className='image' */
    //               /* layout='fill'
    //               objectFit='cover' */
    //               className='block max-h-80 md:max-w-sm mx-auto md:m-0'
    //             />
    //           </div>
    //           <div className='information py-2 border-b border-black mb-2'>
    //             <h3 className='text-lg pb-1'>{item.description}</h3>
    //             <p className='text-sm leading-6'>{item.content}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='company-info justify-end break-all text-base'>
    //         <ul className=''>
    //           <div className='information mb-4 pb-2 border-b'>
    //           {item.email && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                 <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                   <AiOutlineMail></AiOutlineMail>
    //                 </div>
    //                   <a
    //                     className='hover:underline'
    //                     href={`mailto:${item.email}`}
    //                   >
    //                     {item.email}
    //                   </a>
    //                 </div>
    //               </li>
    //             )}

    //             {item.phone && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                 <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                   <AiOutlinePhone></AiOutlinePhone>
    //                 </div>
    //                   <a className='hover:underline' href={`tel:${item.phone}`}>
    //                     {item.phone}
    //                   </a>
    //                 </div>
    //               </li>
    //             )}

    //             {/* {item.address && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                   <FaMapMarkedAlt className='text-beige-normal inline-block mr-4 self-start mt-1' />
    //                   <div className='inline-block'>
    //                     <a
    //                       className='hover:underline'
    //                       target='blank'
    //                       href={`http://maps.google.com/?q=${item.address}`}
    //                     >
    //                       {item.address}
    //                     </a>
    //                   </div>
    //                 </div>
    //               </li>
    //             )} */}

    // {item.guests && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                 <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                   <BsPersonFill></BsPersonFill>
    //                 </div>
    //                   <div className='inline-block'>
    //                     <p>Max {item.guests} gäster</p>
    //                   </div>
    //                 </div>
    //               </li>
    //             )}

    // {item.rating === 0 && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                 <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                   <AiFillStar/>
    //                 </div>
    //                   <div className='inline-block'>
    //                     <p>{item.rating}</p>
    //                   </div>
    //                 </div>
    //               </li>
    //             )}

    // {item.website && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                 <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                   <FaGlobeAmericas/>
    //                 </div>
    //                   <div className='inline-block'>
    //                     <a
    //                       target='blank'
    //                       href={item.website}
    //                       className='hover:underline'
    //                     >
    //                       {item.website}
    //                     </a>
    //                   </div>
    //                 </div>
    //               </li>
    //             )}
    //               {item.county && (
    //               <li>
    //                 <div className='flex items-center mb-1'>
    //                   <div className="w-min self-start text-beige-normal inline-block mr-4 mt-1">
    //                     <ImLocation />
    //                   </div>
    //                   <div className='inline-block'>
    //                     {item.county.length >= 21 ? (
    //                       <p className='mr-2'>Hela Sverige</p>
    //                     ) : (
    //                       item.county.map((item) => (
    //                         <div key={item.value} className='mr-2 inline-block'>
    //                           {item.label}
    //                         </div>
    //                       ))
    //                     )}
    //                   </div>
    //                 </div>
    //               </li>
    //             )}
    //           </div>

    //         </ul>
    //       </div>
    //       <div className='mt-2'>
    //         <div className='flex justify-end'>
    //           <Link href={`/item/${item._id}`} passHref>
    //             <Button primary='true' className='mr-2'>
    //               Läs mer...
    //             </Button>
    //           </Link>
    //           <Button
    //             className='w-min p-0 px-2'
    //             primary='true'
    //             onClick={handleDelete}
    //           >
    //             <FiTrash className='text-xl' />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>

    //     /*
    //         <div className='flex flex-row justify-between items-center'>
    //           <Link href={`/item/${item._id}`} passHref>
    //             <Button primary='true' round='true'>
    //               View
    //             </Button>
    //           </Link>
    //           <RiDeleteBinLine
    //             className='text-2xl cursor-pointer'
    //             onClick={handleDelete}
    //           />
    //         </div>
    //       </div>
    //     </div> */
  )
}

export default CartItem
