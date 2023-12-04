import { Router } from 'express'
import { createUser, getOneUser, loginUser } from '../controllers/auth.js'

export const authRoutes = Router()

authRoutes.post('/users/create', createUser)
authRoutes.post('/users/login', loginUser)
authRoutes.get('/users/:id', getOneUser)
