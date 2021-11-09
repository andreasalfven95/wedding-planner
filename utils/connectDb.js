import mongoose from 'mongoose'

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.')
    return
  }

  /* mongoose
    .connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB!')
    })
    .catch((err) => {
      console.log('Connection failed!' + err.message)
    }) */

  mongoose.connect(
    process.env.MONGODB_URL,
    /* {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, */
    async (err) => {
      if (err) throw err
      console.log('Connected to mongodb.')
    }
  )
}

export default connectDB
