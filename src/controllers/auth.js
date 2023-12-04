import User from '../models/auth.js'
import { rm } from 'node:fs/promises'
import { compare, hash } from 'bcrypt'
import { uploadSingleImage } from '../libs/cloudinary.js'
import { verifyClientData, verifyPartialData } from '../libs/zod.js'
import { createTokenSession } from '../helpers/auth.js'
import { ONE_HOUR, clientHost } from '../settings.js'

const COOKIE_CONFIG = {
  httpOnly: false,
  secure: true,
  expires: ONE_HOUR,
  sameSite: 'none',
  domain: process.env.NODE_ENV === 'production' && clientHost
}
const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dzmuriaby/image/upload/v1701369252/avatares/ucqpxvyuji2z0gqwbwg9.png'

// crear un nuevo usuario
export const createUser = async (req, res) => {
  const clientData = req.body
  const avatar = req.files?.avatar

  const verifiedData = verifyClientData(clientData)

  if (verifiedData.issues) return res.status(400).json(verifiedData.issues)

  const { name, username, password, email } = verifiedData

  try {
    // encriptar la contraseña
    const passwordHashed = await hash(password, 10)

    // si el usuario quiere subir un avatar
    if (avatar) {
      const uploadResponse = await uploadSingleImage(avatar.tempFilePath, {
        folder: 'avatares'
      })

      if (uploadResponse.error) { return res.status(500).json(uploadResponse.error) }

      await rm('./temp-files', { recursive: true })

      const newUser = new User({
        name,
        username,
        email,
        passwordHashed,
        avatar: uploadResponse,
        followers: [],
        following: []
      })

      const userSaved = await newUser.save()

      const token = createTokenSession(userSaved)

      res.cookie('session', token, COOKIE_CONFIG)

      return res.json(userSaved)
    }

    // si el usuario no selecciono avatar subir con imagen por defecto
    const newUser = new User({
      name,
      username,
      email,
      passwordHashed,
      avatar: {
        secureUrl: DEFAULT_AVATAR
      },
      followers: [],
      following: []
    })

    const userSaved = await newUser.save()

    const token = createTokenSession(userSaved)

    res.cookie('session', token, COOKIE_CONFIG)

    return res.json(userSaved)
  } catch (e) {
    return res.status(500).json(e)
  }
}

// logear a un usuario
export const loginUser = async (req, res) => {
  const userData = req.body

  const validatedData = verifyPartialData(userData)

  if (validatedData.issues) return res.status(500).json(validatedData.issues)

  const { email, password } = validatedData

  try {
    // verificar si el usuario existe en bdd
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(404)
        .json({ error: 'Algunos datos estan mal, por favor revísalos' })
    }

    // comparar la contraseña
    const isMatch = await compare(password, user.passwordHashed)

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: 'Algunos datos estan mal, por favor revísalos' })
    }

    // crear token de sesión
    const token = createTokenSession(user)

    res.cookie('session', token, COOKIE_CONFIG)
    return res.json(user)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}

// cerrar sesion de usuario
export const logoutUser = async (req, res) => {
  res.cookie('session', '', { expires: new Date(0) })
  return res.json({ message: 'Sesión cerrada existosamente, vuelva pronto!' })
}

// buscar un usuario
export const getOneUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res
        .status(404)
        .json({ error: 'No se ha encontrado este usuario' })
    }

    return res.json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
}
