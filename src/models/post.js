import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: []
  },
  userId: {
    ref: 'User',
    type: Schema.ObjectId
  },
  likes: {
    type: [Schema.ObjectId]
  },
  comments: {
    type: [{}]

  }
}, {
  versionKey: false,
  timestamps: true
})

export default model('Post', postSchema)
