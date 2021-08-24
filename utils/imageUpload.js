export const imageUpload = async (images) => {
  let imgArr = []
  for (const item of images) {
    const formData = new FormData()
    formData.append('file', item)
    formData.append(
      'upload_preset',
      process.env.CLOUD_UPDATE_PRESET
      /* process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET */
    )
    formData.append('upload_preset', process.env.CLOUD_UPDATE_PRESET)
    formData.append('cloud_name', process.env.CLOUD_NAME)
    /* formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME) */

    const res = await fetch(process.env.CLOUD_API, {
      /* const res = await fetch(process.env.NEXT_PUBLIC_CLOUD_API, { */
      method: 'POST',
      body: formData,
    })

    if (res.err) return console.log('FUNGERAR ICKE...')

    const data = await res.json()
    if (data.err) return console.log('FUNGERAR ICKE...')

    imgArr.push({ public_id: data.public_id, url: data.secure_url })
  }

  return imgArr
}
