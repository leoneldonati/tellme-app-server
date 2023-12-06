import jwt from 'jsonwebtoken'
import { jwtSecret } from '../settings.js'

export const createTokenSession = (payload) => jwt.sign(JSON.stringify(payload), jwtSecret)
export const verifyTokenSession = (token) => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch (e) {
    return e
  }
}
