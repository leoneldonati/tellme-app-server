import { Router } from 'express'
import { addPost, getPosts } from '../controllers/posts.js'
import { verifyClientSession } from '../middlewares/auth.js'

export const postsRoutes = Router()

postsRoutes.post('/posts', verifyClientSession, addPost)
postsRoutes.get('/posts/:quantity', verifyClientSession, getPosts)
