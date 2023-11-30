import User from '../models/auth.js'
import { rm } from 'node:fs/promises'
import { hash } from 'bcrypt'
import { uploadSingleImage } from '../libs/cloudinary.js'
import { verifyClientData } from '../libs/zod.js'
import { createTokenSession } from '../helpers/auth.js'
import { ONE_HOUR } from '../settings.js'

const COOKIE_CONFIG = { httpOnly: false, secure: true, expires: ONE_HOUR }
const DEFAULT_AVATAR = 'https://res.cloudinary.com/dzmuriaby/image/upload/v1701369252/avatares/ucqpxvyuji2z0gqwbwg9.png'

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
      const uploadResponse = await uploadSingleImage(avatar.tempFilePath, { folder: 'avatares' })

      if (uploadResponse.error) return res.status(500).json(uploadResponse.error)

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

}
