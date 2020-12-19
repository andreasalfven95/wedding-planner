import styled from 'styled-components'

/* Toasts are hidden by default. Use the data-autohide="false" attribute to show it by default. To close it, use a <button> element and add data-dismiss="toast": */

const Toast = ({ msg, handleShow }) => {
  return (
    <ToastContainer>
      <ToastHeader>{msg.title}</ToastHeader>
      <ToastMsg>{msg.msg}</ToastMsg>
      <CloseBtn onClick={handleShow}>X</CloseBtn>
    </ToastContainer>

    // <div
    //   className={`toast show text-light`}
    //   style={{
    //     display: 'flex',
    //     /*top: '80px',
    //     zIndex: 9, */
    //     minWidth: '100%',
    //     background: '#F26A2E',
    //     alignItems: 'center',
    //   }}
    // >
    //   <div
    //     className={`toast-header text-light`}
    //     style={{ outline: 'none', border: 0, background: '#F26A2E' }}
    //   >
    //     <h5 className='m-auto text-light'>{msg.title}</h5>
    //     <button
    //       type='button'
    //       className='close text-light'
    //       data-dismiss='toast'
    //       style={{ outline: 'none', background: 'none' }}
    //       onClick={handleShow}
    //     >
    //       x
    //     </button>
    //   </div>
    //   <h4 className='toast-body text-light'>{msg.msg}</h4>
    // </div>
  )
}

export default Toast

const ToastContainer = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background: #f26a2e;
  padding: 0rem 1rem;
  /* padding: 0.5rem calc((100vw - 1300px) / 2); */
`

const ToastHeader = styled.h5`
  color: #fff;
  margin: 0;
  padding: 0 1rem;
`

const ToastMsg = styled.h5`
  color: #fff;
  margin: 0;
  padding: 0 1rem;
`

const CloseBtn = styled.button`
  color: #fff;
  background: none;
  border: none;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`
