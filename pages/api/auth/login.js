import connectDB from '../../../utils/connectDb'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'
import Users from '../../../models/userModel'
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await login(req, res)
      break
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ err: 'This user does not exists.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ err: 'Incorrect password.' })
    }

    /* if (!isMatch || !user) {
      return res.status(400).json({ err: 'Incorrect password or email.' })
    } */

    const access_token = createAccessToken({ id: user._id })
    const refresh_token = createRefreshToken({ id: user._id })

    res.json({
      msg: 'Login success!',
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
