import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  username: z.string().toLowerCase(),
  password: z.string(),
  email: z.string().email()
})

// verificar datos del cliente
export const verifyClientData = (clientData) => {
  try {
    return userSchema.parse(clientData)
  } catch (e) {
    return e
  }
}
