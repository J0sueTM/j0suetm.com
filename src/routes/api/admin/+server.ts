import prisma from '../db'
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from '../auth'

export const POST = (async ({ request }) => {
  const body = await request.json()

  const user = await prisma.user.findFirst({
    select: {
      name: true,
      hash: true
    },
    where: {
      name: body.username.toLowerCase()
    }
  })
  .then((usr) => usr)
  .catch((err: Error) => err)

  if (user == null)
    return new Response('user doesn\'t exist', {status: 401})
  else if (user instanceof Error)
    return new Response(user.message, {status: 401})

  const result = await bcrypt.compare(body.password, user.hash).then(result => result)
  if (!result)
    return new Response('Incorrect password', {status: 401})

  const jwtToken = generateToken(true)

  return new Response(JSON.stringify({
    'token': jwtToken,
    'result': result
  }))
})

export const PUT = (async ({ request }) => {
  const body = await request.json()

  const ok: boolean = await verifyToken(body.jwtToken)

  return new Response(JSON.stringify({'result': ok}))
})