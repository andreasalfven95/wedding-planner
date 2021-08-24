const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
/* const baseUrl = process.env.BASE_URL */

export const getData = async (url, token) => {
  /* const res = await fetch(`${baseUrl}/api/${url}`, { */
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  const data = await res.json()
  return data
}

export const postData = async (url, post, token) => {
  /* const res = await fetch(`${baseUrl}/api/${url}/index.js`, { */
  const res = await fetch(`/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* Accept: 'application/json', */
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  if (res.err)
    return dispatch({
      type: 'NOTIFY',
      payload: { error: res.err },
    })

  const data = await res.json()
  return data
}

export const putData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  if (res.err)
    return dispatch({
      type: 'NOTIFY',
      payload: { error: res.err },
    })

  const data = await res.json()
  return data
}

export const patchData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  if (res.err)
    return dispatch({
      type: 'NOTIFY',
      payload: { error: res.err },
    })

  const data = await res.json()
  return data
}

export const deleteData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
  if (res.err)
    return dispatch({
      type: 'NOTIFY',
      payload: { error: res.err },
    })

  const data = await res.json()
  return data
}
