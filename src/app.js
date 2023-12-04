import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'
import { authRoutes } from './routes/auth.js'
import { clientHost } from './settings.js'

export const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: clientHost,
  credentials: true
}))

app.use(morgan('dev'))

// poder recibir archivos desde el cliente

app.use(fileUpload({ useTempFiles: true, tempFileDir: './temp-files' }))

// rutas

app.use(authRoutes)
