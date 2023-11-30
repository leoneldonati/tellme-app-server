import express from 'express'
import fileUpload from 'express-fileupload'
import { authRoutes } from './routes/auth.js'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// poder recibir archivos desde el cliente

app.use(fileUpload({ useTempFiles: true, tempFileDir: './temp-files' }))

// rutas

app.use(authRoutes)
