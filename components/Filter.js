import React, { useContext, useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'

const Filter = ({ state }) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')
  /* const [showAll, setShowAll] = useState(false) */

  const { categories } = state

  const router = useRouter()

  /* const { state, dispatch } = useContext(DataContext)
  const { auth, categories } = state */

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({ router, category: e.target.value })
  }

  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({ router, sort: e.target.value })
  }

  /* const handleShowAll = (e) => {
    setShow(!showAll)
    filterSearch({ router, sort: e.target.value })
  } */

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
  }, [search])

  return (
    <div className='input-group'>
      {/* {auth.user.role === 'admin' && (
        <input
          className='h-5 w-5'
          type='checkbox'
          defaultChecked={showAll}
          onChange={handleShowAll}
          name='show'
        />
      )} */}
      <div className='input-group-prepend col-md-2 px-0 mt-2'>
        <select
          className='custom-select text-capitalize'
          value={category}
          onChange={handleCategory}
        >
          <option value='all'>All Products</option>

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
          <option value='-createdAt'>Newest</option>
          <option value='oldest'>Oldest</option>
          <option value='-sold'>Most sold</option>
          <option value='-price'>Price: Hight-Low</option>
          <option value='price'>Price: Low-Hight</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
