import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    trim: true
  },
  passwordHashed: {
    type: String
  },
  email: {
    type: String,
    trim: true
  },
  avatar: {
    type: Object
  },
  followers: {
    type: [Schema.ObjectId]
  },
  following: {
    type: [Schema.ObjectId]
  }
},
{
  versionKey: false,
  timestamps: true
})

export default model('User', userSchema)
