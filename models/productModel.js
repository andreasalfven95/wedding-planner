import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
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
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    county: {
      type: Array,
      required: true,
    },
    guests: {
      type: String,
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
    contact: {
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
      street: {
        type: String,
      },
      city: {
        type: String,
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
    },
  },
  {
    timestamps: true,
  }
)

let Dataset =
  mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset
