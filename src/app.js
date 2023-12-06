import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'
import { authRoutes } from './routes/auth.js'
import { clientHost } from './settings.js'
import { postsRoutes } from './routes/posts.js'
import cookieParser from 'cookie-parser'

export const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: clientHost,
  credentials: true
}))

app.use(cookieParser())

app.use(morgan('dev'))

// poder recibir archivos desde el cliente

app.use(fileUpload({ useTempFiles: true, tempFileDir: './temp-files' }))

// rutas

app.use(authRoutes)
app.use(postsRoutes)
