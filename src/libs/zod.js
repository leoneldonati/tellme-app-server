import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  username: z.string().toLowerCase(),
  password: z.string(),
  email: z.string().email()
})
const postSchema = z.object({
  title: z.string(),
  description: z.string()
})

export const verifyPostData = (postData) => {
  try {
    return postSchema.parse(postData)
  } catch (e) {
    return e
  }
}

// verificar datos del cliente
export const verifyClientData = (clientData) => {
  try {
    return userSchema.parse(clientData)
  } catch (e) {
    return e
  }
}

// verificar datos para login
export const verifyPartialData = (userData) => {
  try {
    return userSchema.partial({ name: true, username: true }).parse(userData)
  } catch (e) {
    return e
  }
}
