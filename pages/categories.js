import React from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import { updateItem } from '../store/Actions'
import { useContext, useState } from 'react'
import { postData, putData } from '../utils/fetchData'

import { AiFillEdit } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

const Categories = () => {
  const [name, setName] = useState('')

  const { state, dispatch } = useContext(DataContext)
  const { categories, auth } = state

  const [id, setId] = useState('')

  const createCategory = async () => {
    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Authentication is not vaild.' },
      })
    /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }

    if (!name)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Name can not be left blank.' },
      })

    /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    let res
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token)
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))
    } else {
      res = await postData('categories', { name }, auth.token)
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      dispatch({
        type: 'ADD_CATEGORIES',
        payload: [...categories, res.newCategory],
      })
    }
    setName('')
    setId('')
    /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }
    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }

  const handleEditCategory = (catogory) => {
    setId(catogory._id)
    setName(catogory.name)
  }

  if (!auth.user) return null
  return (
    <div className='card mx-auto my-3'>
      <Head>
        <title>Categories</title>
      </Head>

      <div className='flex text-grey-darker text-sm font-bold mb-2'>
        <input
          type='text'
          placeholder='Add a new category'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker'
        />
        <button
          type='submit'
          onClick={createCategory}
          className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded ml-1'
        >
          {id ? 'Update' : 'Create'}
        </button>
      </div>

      {categories.map((category) => (
        <div key={category._id} className='card my-2'>
          <div className='card-body flex justify-between'>
            {category.name}
            <div className='cursor-pointer flex items-center'>
              <AiFillEdit
                onClick={() => handleEditCategory(category)}
                className='mr-2'
              ></AiFillEdit>

              <FaTrash
                className='ml-4 cursor-pointer'
                title='Remove'
                onClick={() =>
                  dispatch({
                    type: 'ADD_MODAL',
                    payload: [
                      {
                        data: categories,
                        id: category._id,
                        title: category.name,
                        type: 'ADD_CATEGORIES',
                      },
                    ],
                  })
                }
              ></FaTrash>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories
