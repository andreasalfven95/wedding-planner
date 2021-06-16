import React, { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import County from '../data/County'
import Select from 'react-select'
/* import Image from './image/Image'
import NextImg from 'next/image'
import img from '/img/logo.png' */

const Filter = ({ state }) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')
  const [county, setCounty] = useState([])
  /* const [county, setCounty] = useState([]) */

  const { categories } = state

  const Sort = [
    /* <option value='random'>Slumpmässigt</option> */
    /* <option value='-rating'>Bäst betyg</option> */
    { value: '-createdAt', label: 'Senaste' },
    { value: 'createdAt', label: 'Tidigaste' },
    { value: 'title', label: 'A-Ö' },
    { value: '-title', label: 'Ö-A' },
  ]

  /* const Categories = {categories.map((item) => {
    return{
      value: item._id,
      label: item._id
    }
  })}
  
  [
    { value: 'all', label: 'Alla kategorier' },
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
  ] */

  const router = useRouter()

  /* const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({ router, category: e.target.value })
  } */

  /* const handleCounty = (e) => {
    setCounty(e)
    console.log(e.target)
    console.log(county)
  } */

  /* const handleSort = (e) => {
    setSort(e.target.value)
    console.log(e.target.value)
    filterSearch({ router, sort: e.target.value })
  } */

  useEffect(() => {
    console.log(sort)
    filterSearch({
      router,
      sort: sort.value,
    })
  }, [sort])

  useEffect(() => {
    console.log(category)
    if (category === null) {
      filterSearch({
        router,
        category: 'all',
      })
    } else {
      filterSearch({
        router,
        category: category.value,
      })
    }
  }, [category])

  useEffect(() => {
    if (county === null) {
      filterSearch({
        router,
        county: 'all',
      })
    } else {
      filterSearch({
        router,
        county: county.value,
      })
    }
  }, [county])

  /* useEffect(() => {
    filterSearch({
      router,
      county: county.map((item) => {
        return item.value.toString()
      }),
    })
  }, [county]) */

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
  }, [search])

  return (
    <div className=''>
      <div className='p-16'>
        <div /* className='w-full h-full max-w-full max-h-full absolute z-0' */>
          {/* <NextImage
            layout='fill'
            className='object-center object-cover pointer-events-none'
            src={backgroundImage}
            alt={title}
          /> */}
          <img
            src='/img/wedding.jpg'
            alt='logo'
            className='pointer-events-none'
          />
        </div>
      </div>
      <div className='input-group p-16 bg-opacity-50 bg-white z-10'>
        <div className='input-group-prepend col-md-2 px-0 mt-2'>
          <Select
            placeholder='Alla kategorier'
            value={category}
            name='category'
            id='category'
            onChange={setCategory}
            closeMenuOnSelect={true}
            isClearable={true}
            options={categories.map((item) => {
              return {
                label: item.name,
                value: item._id,
              }
            })}
          />
          {/* <select
          className='custom-select text-capitalize shadow border rounded w-full py-2 pl-1 pr-4 text-grey-darker'
          value={category}
          onChange={handleCategory}
        >
          <option value='all'>Alla kategorier</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select> */}
        </div>

        <div className='input-group-prepend col-md-2 px-0 mt-2'>
          <Select
            /* placeholder='Markera det län som är aktuellt för er...' */
            placeholder='Alla län'
            value={county}
            name='county'
            id='county'
            onChange={setCounty}
            closeMenuOnSelect={true}
            options={County}
            isClearable={true}
          />

          {/* <Select
          placeholder='Markera de län som är aktuella för er...'
          value={county.map((item) => {
            return item
          })}
          name='county'
          id='county'
          onChange={setCounty}
          closeMenuOnSelect={true}
          options={County}
          isMulti
          isClearable={true}
        /> */}
        </div>

        <form autoComplete='off' className='mt-2 col-md-8 px-0'>
          <input
            type='text'
            className='shadow appearance-none border rounded w-full py-2 px-2'
            list='title_product'
            placeholder='Namn på plats eller företag...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className='input-group-prepend col-md-2 px-0 mt-2'>
          <Select
            placeholder='Sortera efter'
            value={sort}
            onChange={setSort}
            closeMenuOnSelect={true}
            options={Sort}
            isSearchable={false}
          />

          {/* <select
          className='custom-select text-capitalize shadow border rounded w-full py-2 pl-1 text-grey-darker'
          value={sort}
          onChange={handleSort}
        >
          <option value='random'>Slumpmässigt</option>
          <option value='-createdAt'>Senaste</option>
          <option value='createdAt'>Tidigaste</option>
          <option value='-rating'>Bäst betyg</option>
          <option value='title'>A-Ö</option>
          <option value='-title'>Ö-A</option>
        </select> */}
        </div>
      </div>
    </div>
  )
}

export default Filter
