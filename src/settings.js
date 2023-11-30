import { config } from 'dotenv'

config()

export const port = process.env.PORT ?? 3000
export const jwtSecret = process.env.JWT_SECRET

// cloudinary
export const cldName = process.env.CLD_NAME
export const cldKey = process.env.CLD_KEY
export const cldSecret = process.env.CLD_SECRET

// mongo db
export const dbPass = process.env.DB_PASS

export const ONE_HOUR = new Date(Date.now() + 60 * 60 * 1000)
