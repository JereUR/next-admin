import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    routines: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Routine'
      }
    ]
  },
  { timestamps: true }
)

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    img: {
      type: String
    },
    category: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: String
    }
  },
  { timestamps: true }
)

const exerciseSchema = new Schema({
  series: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  measure: {
    type: String,
    required: true
  },
  zone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  rest: {
    type: String
  },
  description: {
    type: String
  }
})

const customRoutineSchema = new Schema(
  {
    id: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    days: [
      {
        day: {
          type: String,
          required: true
        },
        exercises: [exerciseSchema]
      }
    ],
    description: {
      type: String
    }
  },
  { timestamps: true }
)

const routineSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  day: {
    type: String,
    required: true
  },
  exercises: {
    type: [exerciseSchema]
  }
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
const Exercise =
  mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema)
const CustomRoutine =
  mongoose.models.CustomRoutine ||
  mongoose.model('CustomRoutine', customRoutineSchema)
const Routine =
  mongoose.models.Routine || mongoose.model('Routine', routineSchema)
const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = { Exercise, Routine, User, Product, CustomRoutine }
