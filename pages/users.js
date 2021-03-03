import Head from 'next/head'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import { BsCheck } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

const Users = () => {
  const { state, dispatch } = useContext(DataContext)
  const { users, auth, modal } = state

  if (!auth.user) return null
  return (
    <div className=''>
      <Head>
        <title>Users</title>
      </Head>

      <table className='table table-auto w-full'>
        <thead>
          <tr>
            <th></th>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className='hover:bg-gray-200'>
              <th className='py-6'>{index + 1}</th>
              {/* <th>{user._id}</th> */}
              <th className='py-6'>{user.name}</th>
              <th className='py-6'>{user.email}</th>
              <th className='py-6'>
                <img
                  src={user.avatar}
                  alt={user.avatar}
                  className='mx-auto'
                  style={{
                    width: '30px',
                    height: '30px',
                    overflow: 'hidden',
                    objectFit: 'cover',
                  }}
                />
              </th>
              <th className='py-6'>
                {user.role === 'admin' ? (
                  user.root ? (
                    <div>
                      <BsCheck className='text-green-600 text-xl mx-auto'></BsCheck>
                      <i className='text-green-600'>Root</i>
                    </div>
                  ) : (
                    <BsCheck className='text-green-600 text-xl mx-auto'></BsCheck>
                  )
                ) : (
                  <FaTimes className=' text-red-600 text-xl mx-auto'></FaTimes>
                )}
              </th>
              <th className='py-6'>
                <div className='flex items-center justify-center'>
                  <Link
                    href={
                      auth.user.root && auth.user.email !== user.email
                        ? `/edit_user/${user._id}`
                        : '#!'
                    }
                  >
                    <a className='inline-block'>
                      <AiFillEdit className='text-xl' title='Edit'></AiFillEdit>
                    </a>
                  </Link>

                  {auth.user.root && auth.user.email !== user.email ? (
                    <FaTrash
                      className='ml-4'
                      title='Remove'
                      data-toggle='modal'
                      data-target='#exampleModal'
                      onClick={() =>
                        dispatch({
                          type: 'ADD_MODAL',
                          payload: [
                            {
                              data: users,
                              id: user._id,
                              title: user.name,
                              type: 'ADD_USERS',
                            },
                          ],
                        })
                      }
                    ></FaTrash>
                  ) : (
                    <FaTrash
                      className='ml-4'
                      title='Remove'
                      data-toggle='modal'
                      data-target='#exampleModal'
                      onClick={() =>
                        dispatch({
                          type: 'ADD_MODAL',
                          payload: [
                            {
                              data: users,
                              id: user._id,
                              title: user.name,
                              type: 'ADD_USERS',
                            },
                          ],
                        })
                      }
                    ></FaTrash>
                  )}
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
