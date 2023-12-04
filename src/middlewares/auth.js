export const verifyClientSession = (req, res, next) => {
  const token = req.cookies

  res.json(token)
}
