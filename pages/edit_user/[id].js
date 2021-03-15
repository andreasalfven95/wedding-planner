import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from '../../store/GlobalState'
import { updateItem } from '../../store/Actions'
import { useRouter } from 'next/router'
import { patchData } from '../../utils/fetchData'

const EditUser = () => {
  const router = useRouter()
  const { id } = router.query

  const { state, dispatch } = useContext(DataContext)
  const { auth, users } = state

  const [editUser, setEditUser] = useState([])
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [num, setNum] = useState(0)

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user)
        setCheckAdmin(user.role === 'admin' ? true : false)
      }
    })
  }, [users])

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin)
    /* setNum(num + 1) */
  }

  const handleSubmit = () => {
    let role = checkAdmin ? 'admin' : 'user'
    /* if (num % 2 !== 0)  */ {
      dispatch({ type: 'NOTIFY', payload: { loading: true } })
      patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
        if (res.err) {
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        dispatch(
          updateItem(
            users,
            editUser._id,
            {
              ...editUser,
              role,
            },
            'ADD_USERS'
          )
        )
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })
    }
  }

  return (
    <div className='my-3'>
      <Head>
        <title>Edit user</title>
      </Head>

      <div>
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => router.back()}
        >
          Go back!
        </button>
      </div>

      <div className='grid-cols-4 mx-auto my-4'>
        <h2 className='uppercase '>Edit user</h2>

        <div className='block text-grey-darker text-sm font-bold mb-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            defaultValue={editUser.name}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
            disabled
          />
        </div>

        <div className='block text-grey-darker text-sm font-bold mb-2'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            defaultValue={editUser.email}
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
            disabled
          />
        </div>

        <div className='block text-grey-darker text-sm font-bold mb-2'>
          <label htmlFor='isAdmin'>Is Admin? </label>
          <input
            type='checkbox'
            id='isAdmin'
            checked={checkAdmin}
            onChange={handleCheck}
            style={{
              width: '20px',
              height: '20px',
            }}
          />
        </div>

        <button
          type='submit'
          className='bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default EditUser
