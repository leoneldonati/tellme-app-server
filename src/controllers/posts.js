import { uploadPostsImages } from '../libs/cloudinary.js'
import { verifyPostData } from '../libs/zod.js'
import Post from '../models/post.js'

// añadir un post a bdd
export const addPost = async (req, res) => {
  const postData = req.body
  const images = req.files?.images
  const userInfo = req.userInfo

  const verifiedData = verifyPostData(postData)

  if (verifiedData.issues) return res.status(400).json({ error: verifiedData.issues })

  const { title, description } = verifiedData

  try {
    // si el usuario quiere subir fotos
    if (images) {
      const imagesUploaded = await uploadPostsImages(images, { folder: 'posts' })

      const newPost = new Post({
        title,
        description,
        images: imagesUploaded,
        user: userInfo,
        likes: [],
        comments: []
      })

      const postSaved = await newPost.save()

      return res.json(postSaved)
    }

    const newPost = new Post({
      title,
      description,
      images: [],
      comments: [],
      likes: [],
      user: userInfo
    })

    const postSaved = await newPost.save()

    return res.json(postSaved)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
}

// obtener posts
export const getPosts = async (req, res) => {
  const quantity = Number(req.params?.quantity)

  if (!quantity) return res.status(400).json({ error: 'Debes agregar el parametro de cantidad de posts!' })
  try {
    const posts = await Post.find().limit(quantity)

    res.json(posts)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}

// obtener todos los posts del usuario
export const getUserPosts = async (req, res) => {
  const userId = req.userInfo?._id

  try {
    const userPosts = await Post.find({ userId })

    if (!userPosts) return res.status(404).json({ error: 'No hemos encontrado ninguna publicacion tuya!' })
    res.json(userPosts)
  } catch (e) {
    console.log(e)
  }
}
