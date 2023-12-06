import { Router } from 'express'
import { createUser, getOneUser, loginUser, logoutUser } from '../controllers/auth.js'

export const authRoutes = Router()

authRoutes.post('/users/create', createUser)
authRoutes.post('/users/login', loginUser)
authRoutes.post('/users/logout', logoutUser)
authRoutes.get('/users/:id', getOneUser)
