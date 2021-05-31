import connectDB from '../../../utils/connectDb'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res)
      break
    case 'PUT':
      await updateProduct(req, res)
      break
    case 'DELETE':
      await deleteProduct(req, res)
      break
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.query

    const product = await Products.findById(id)
    if (!product)
      return res.status(400).json({ err: 'This product does not exist.' })

    res.json({ product })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res)
    /* ADDED USER AS VALID CREATER OF PRODUCT */
    if (result.role !== 'admin' && result.role !== 'user')
      return res.status(400).json({ err: 'Authentication is not valid.' })

    const { id } = req.query
    const {
      userid,
      show,
      title,
      description,
      content,
      about,
      category,
      guests,
      email,
      phone,
      instagram,
      facebook,
      website,
      images,
      county,
      address,
      coordinates,
    } = req.body

    if (
      !title ||
      !description ||
      !content ||
      !about ||
      !email ||
      !phone ||
      !category ||
      images.length === 0 ||
      county.length === 0 ||
      (category === '6097c79b9a472e0a50e1550b' && !guests)
    )
      return res.status(400).json({ err: 'Please add all the fields.' })

    await Products.findOneAndUpdate(
      { _id: id },
      {
        /* Set updated title to lowercase */
        userid,
        show,
        title: title.toLowerCase(),
        description,
        content,
        about,
        category,
        guests,
        email,
        phone,
        instagram,
        facebook,
        website,
        images,
        county,
        address,
        coordinates,
      }
    )

    res.json({ msg: 'Success updating a product!' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Authentication is not valid.' })

    const { id } = req.query

    await Products.findByIdAndDelete(id)
    res.json({ msg: 'Deleted a product.' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
