export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  AUTH: 'AUTH',
  ADD_CART: 'ADD_CART',
  ADD_MODAL: 'ADD_MODAL',
  ADD_USERS: 'ADD_USERS',
}

export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return {
      type: 'NOTIFY',
      payload: { error: 'This product is out of stock.' },
    }
  /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
  {
    setTimeout(() => {
      {
        dispatch({ type: 'NOTIFY', payload: {} })
      }
    }, 5000)
  }
  const check = cart.every((item) => {
    return item._id !== product._id
  })

  if (!check)
    return {
      type: 'NOTIFY',
      payload: { error: 'The product has already been added to cart.' },
    }
  /* THIS REMOVES NOTICE/TOAST AFTER 5 SECONDS.*/
  {
    setTimeout(() => {
      {
        dispatch({ type: 'NOTIFY', payload: {} })
      }
    }, 5000)
  }

  return {
    type: 'ADD_CART',
    payload: [...cart, { ...product, quanitity: 1 }],
  }
}

export const decrease = (data, id) => {
  const newData = [...data]
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1
  })

  return { type: 'ADD_CART', payload: newData }
}

export const increase = (data, id) => {
  const newData = [...data]
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1
  })

  return { type: 'ADD_CART', payload: newData }
}

export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id)
  return { type, payload: newData }
}

export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item))
  return { type, payload: newData }
}
