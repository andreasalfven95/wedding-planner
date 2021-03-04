import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
  const { state, dispatch } = useContext(DataContext)
  const { notify } = state

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <div>
          <Toast
            msg={{ msg: notify.error, title: 'fail' }}
            handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          />
        </div>
      )}
      {notify.success && (
        <div>
          <Toast
            msg={{ msg: notify.success, title: 'success' }}
            handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          />
        </div>
      )}
    </>
  )
}

export default Notify
