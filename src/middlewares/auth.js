import { verifyTokenSession } from '../helpers/auth.js'

// verificar si el usuario tiene iniciada la sessión en el cliente
export const verifyClientSession = (req, res, next) => {
  const token = req.cookies?.session

  console.log()
  if (!token) return res.status(403).json({ error: 'La sesion ha expirado' })

  const decodedToken = verifyTokenSession(token)

  if (!decodedToken || decodedToken.name === 'JsonWebTokenError') return res.status(403).json({ error: 'La sesión ha expirado' })

  req.userInfo = decodedToken

  next()
}
