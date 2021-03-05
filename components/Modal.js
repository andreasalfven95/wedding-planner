import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import { useRouter } from 'next/router'

const Modal = (props) => {
  const { state, dispatch } = useContext(DataContext)
  const { modal, auth } = state

  const router = useRouter()

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type))

    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
    /* THIS REMOVES NOTICE/TOAST AFTER 3 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }
  }

  /* const deleteCategories = (item) => {
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

      dispatch(deleteItem(item.data, item.id, item.type))
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
  } */

  const deleteProduct = (item) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      return router.push('/')
    })
    /* THIS REMOVES NOTICE/TOAST AFTER 3 SECONDS.*/
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }
  }

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === 'ADD_CART') {
          dispatch(deleteItem(item.data, item.id, item.type))
        }

        if (item.type === 'ADD_USERS') deleteUser(item)

        /* if (item.type === 'ADD_CATEGORIES') deleteCategories(item) */

        /* if (item.type === 'DELETE_PRODUCT') deleteProduct(item) */

        dispatch({ type: 'ADD_MODAL', payload: [] })
      }
    }
  }

  const removeModal = () => {
    if (modal.length !== 0) {
      dispatch({ type: 'ADD_MODAL', payload: [] })
    }
  }

  if (modal.length === 0) {
    return null
  }

  return (
    <div className='fixed z-50 inset-0 overflow-y-auto' onClick={removeModal}>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                <svg
                  className='h-6 w-6 text-red-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-headline'
                >
                  {modal.length !== 0 && modal[0].title}
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={removeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    /* <div
      classNameName='fixed z-10 inset-0 overflow-y-auto modal fade'
      id='exampleModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div classNameName='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div classNameName='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div classNameName='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          classNameName='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div classNameName='modal-dialog' role='document'>
          <div classNameName='modal-content inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div classNameName='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div classNameName='modal-header'>
                <h5
                  classNameName='modal-title text-capitalize text-lg leading-6 font-medium text-gray-900'
                  id='exampleModalLabel'
                >
                  {modal.length !== 0 && modal[0].title}
                </h5>
                <button
                  type='button'
                  classNameName='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div classNameName='modal-body mt-2'>
                <p classNameName='text-sm text-gray-500'>
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              </div>
            </div>
            <div classNameName='modal-footer bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                classNameName='btn btn-secondary w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                data-dismiss='modal'
                onClick={handleSubmit}
              >
                Yes
              </button>
              <button
                type='button'
                classNameName='btn btn-primary mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                data-dismiss='modal'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> */
  )
}

export default Modal
