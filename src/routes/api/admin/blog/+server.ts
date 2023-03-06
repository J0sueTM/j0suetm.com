import { verifyToken } from '../../auth'
import prisma from '../../db'

export const POST = (async ({ request }) => {
  const token: string = await request.headers.get('authorization')
  if (!verifyToken(token))
    return new Response('Invalid token', {status: 401})

  const body = await request.json()

  const topicId = await prisma.topic.findFirst({
    select: {
      id: true
    },
    where: {
      name: body.topic
    }
  })
  .then(tpc => tpc?.id)
  .catch((err: Error) => err)
  if (topicId == null)
    return new Response(`topic ${body.topic} doesn\'t exist`, {status: 400})
  else if (topicId instanceof Error)
    return new Response(topicId.message, {status: 424})

  const post = await prisma.post.create({
    data: {
      topicId: topicId,
      date: new Date(body.date),
      title: body.title,
      summary: body.text.slice(0, 200),
      text: Buffer.from(body.text),
      tags: body.tags.join(',')
    }
  }).catch((err: Error) => err)
  if (post instanceof Error)
    return new Response(post.message, {status: 424})

  return new Response(JSON.stringify({
    'post': post
  }))
})