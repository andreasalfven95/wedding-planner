export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  AUTH: 'AUTH',
  ADD_CART: 'ADD_CART',
  ADD_MODAL: 'ADD_MODAL',
}

export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return {
      type: 'NOTIFY',
      payload: { error: 'This product is out of stock.' },
    }
  const check = cart.every((item) => {
    return item._id !== product._id
  })

  if (!check)
    return {
      type: 'NOTIFY',
      payload: { error: 'The product has already been added to cart.' },
    }

  return {
    type: 'ADD_CART',
    payload: [...cart, { ...product, quanitity: 1 }],
  }
}

export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id)
  return { type, payload: newData }
}
