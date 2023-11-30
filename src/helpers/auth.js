import jwt from 'jsonwebtoken'
import { jwtSecret } from '../settings.js'

export const createTokenSession = (payload) => jwt.sign(JSON.stringify(payload), jwtSecret)
