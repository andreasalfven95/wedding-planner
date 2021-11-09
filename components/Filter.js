import React, { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import County from '../data/County'
import Select from 'react-select'

const Filter = ({ state }) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')
  const [county, setCounty] = useState([])

  const { categories } = state

  const [img, setImg] = useState('cat_all.jpg')

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
  } */

  /* const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({ router, sort: e.target.value })
  } */

  useEffect(() => {
    /* filterSearch({
      router,
      sort: sort.value,
    }) */

    if (sort === null) {
      filterSearch({
        router,
        sort: 'random',
      })
    } else {
      filterSearch({
        router,
        sort: sort.value,
      })
    }
  }, [sort])

  useEffect(() => {
    if (category === null) {
      setImg('cat_all.jpg')
      filterSearch({
        router,
        category: 'all',
      })
    } else {
      filterSearch({
        router,
        category: category.value,
      })
      //Festlokal
      if (category.value === '6097c79b9a472e0a50e1550b') {
        setImg('cat_venue.jpg')
      }
      //Brudsalong
      if (category.value === '60aa71fb00912e43a869cf61') {
        setImg('cat_salong.jpg')
      }
      //Bröllopsplanerare
      if (category.value === '60aa720800912e43a869cf62') {
        setImg('cat_planner.jpg')
      }
      //Florist
      if (category.value === '60aa721400912e43a869cf63') {
        setImg('cat_flowers.jpg')
      }
      //Fotograf
      if (category.value === '60aa721a00912e43a869cf64') {
        setImg('cat_photo.jpg')
      }
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
    <div
      className='border-none z-50'
      style={{
        backgroundImage: `url(${'/img/' + img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className='input-group p-12 z-10 border-none'
        style={{
          backgroundImage:
            'linear-gradient(rgba(244,242,239,0.7), rgba(255,255,255,0.3), rgba(244,242,239,0.5))',
        }}
      >
        <div className='mx-auto md:max-w-md'>
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
              className='appearance-none border rounded w-full py-2 px-2'
              list='title_product'
              placeholder='Namn på företag...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className='input-group-prepend col-md-2 px-0 mt-2'>
            <Select
              placeholder='Sortera efter'
              value={sort}
              name='sort'
              id='sort'
              onChange={setSort}
              closeMenuOnSelect={true}
              options={Sort}
              isSearchable={false}
              isClearable={true}
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
    </div>
  )
}

export default Filter
