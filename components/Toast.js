import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'

const Toast = ({ msg, handleShow }) => {
  const { state, dispatch } = useContext(DataContext)

  const showToast = () => {
    hideToast()
    return (
      <div className='fixed right-0 bottom-0 m-2 z-40' onClick={handleShow}>
        {msg.title === 'success' && (
          <div className='flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2'>
            <div className='text-green-500 rounded-full bg-white mr-3'>
              <svg
                width='1.8em'
                height='1.8em'
                viewBox='0 0 16 16'
                className='bi bi-check'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'
                />
              </svg>
            </div>

            <div className='text-white max-w-xs '>{msg.msg}</div>
          </div>
        )}

        {msg.title === 'fail' && (
          <div className='flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2'>
            <div className='text-red-500 rounded-full bg-white mr-3'>
              <svg
                width='1.8em'
                height='1.8em'
                viewBox='0 0 16 16'
                className='bi bi-x'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'
                />
                <path
                  fillRule='evenodd'
                  d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'
                />
              </svg>
            </div>

            <div className='text-white max-w-xs '>{msg.msg}</div>
          </div>
        )}
      </div>
    )
  }

  /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
  const hideToast = () => {
    {
      setTimeout(() => {
        {
          dispatch({ type: 'NOTIFY', payload: {} })
        }
      }, 5000)
    }
  }

  return showToast()
}

export default Toast
