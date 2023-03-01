import jwt from 'jsonwebtoken'
import { PRIVATE_JWT_KEY } from '$env/static/private'

export const generateToken = (admin: boolean) => {
  const token: string = jwt.sign({
    data: {
      admin: admin
    }
  }, PRIVATE_JWT_KEY, {
    algorithm: 'RS256',
    expiresIn: '24h'
  })

  return token
}

export const verifyToken = async (token: string) => {
  jwt.verify(token, PRIVATE_JWT_KEY, (err, decoded) => {
    if (decoded === undefined)
      return false
  })

  return true
}