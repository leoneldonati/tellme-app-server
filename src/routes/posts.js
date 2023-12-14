import { Router } from 'express'
import { addPost, getPosts, getUserPosts } from '../controllers/posts.js'
import { verifyClientSession } from '../middlewares/auth.js'

export const postsRoutes = Router()

postsRoutes.post('/posts', verifyClientSession, addPost)
postsRoutes.get('/posts/:quantity', verifyClientSession, getPosts)
postsRoutes.get('/posts/user', verifyClientSession, getUserPosts)
