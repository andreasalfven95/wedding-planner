import React, { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'

const Filter = ({ state }) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')

  const { categories } = state

  const router = useRouter()

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({ router, category: e.target.value })
  }

  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({ router, sort: e.target.value })
  }

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
      <form autoComplete='off' className='mt-2 col-md-8 px-0'>
        <input
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
          list='title_product'
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
          <option value='title'>A-Ö</option>
          <option value='-title'>Ö-A</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
