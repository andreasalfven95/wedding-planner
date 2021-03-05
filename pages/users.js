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
                      className='ml-4 cursor-pointer'
                      title='Remove'
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
                      className='ml-4 text-gray-400'
                      title='Remove'
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

/* <!-- This example requires Tailwind CSS v2.0+ -->
<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Jane Cooper
                    </div>
                    <div class="text-sm text-gray-500">
                      jane.cooper@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div class="text-sm text-gray-500">Optimization</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>

            <!-- More items... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div> */
