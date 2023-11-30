import { v2 as cld } from 'cloudinary'
import { cldKey, cldName, cldSecret } from '../settings.js'

cld.config({
  cloud_name: cldName,
  api_key: cldKey,
  api_secret: cldSecret
})

const { upload } = cld.uploader

// subir una sola imagen
export const uploadSingleImage = async (path, options) => {
  try {
    const response = await upload(path, options)

    return {
      publicId: response.public_id,
      secureUrl: response.secure_url
    }
  } catch (e) {
    return e.error
  }
}
