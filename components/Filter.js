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
  /* const [county, setCounty] = useState([]) */

  const { categories } = state

  const router = useRouter()

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({ router, category: e.target.value })
  }

  /* const handleCounty = (e) => {
    setCounty(e)
    console.log(e.target)
    console.log(county)
  } */

  const handleSort = (e) => {
    setSort(e.target.value)
    console.log(e.target.value)
    filterSearch({ router, sort: e.target.value })
  }

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
    <div className='input-group'>
      <div className='input-group-prepend col-md-2 px-0 mt-2'>
        <select
          className='custom-select text-capitalize'
          value={category}
          onChange={handleCategory}
        >
          <option value='all'>Alla kategorier</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className=''>
        <Select
          placeholder='Markera det län som är aktuellt för er...'
          value={county}
          name='county'
          id='county'
          onChange={setCounty}
          closeMenuOnSelect={true}
          options={County}
          isClearable={true}
          /* clearValue={setCounty('all')} */
          /* BESTÄM VAD SOM HÄNDER NÄR MAN CLICKAR BORT VALDA LÄN, isClearable */
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
          className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
          list='title_product'
          placeholder='Namn på plats eller företag...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className='input-group-prepend col-md-2 px-0 mt-2'>
        <select
          className='custom-select text-capitalize'
          value={sort}
          onChange={handleSort}
        >
          {/* <option value='random'>Slumpmässigt</option> */}
          <option value='createdAt'>Tidigaste</option>
          <option value='-createdAt'>Senaste</option>
          {/* <option value='-rating'>Bäst betyg</option> */}
          <option value='title'>A-Ö</option>
          <option value='-title'>Ö-A</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
