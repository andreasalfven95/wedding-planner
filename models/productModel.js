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
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      socialmedia: {
        type: Array,
      },
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      county: {
        type: Array,
        required: true,
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
