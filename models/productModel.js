import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      /* required: true, */
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    images: {
      type: Array,
      required: true,
    },
    county: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    payed: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

let Dataset =
  mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset
