import prisma from '../../../db'

export interface GetPostResponse {
  title: string
  text: string
  date: string
  tags: string[]
}

export const GET = (async ({ url }) => {
  const topicName: string = url.pathname.split('/').at(-2)
  let postTitle: string = url.pathname.split('/').at(-1).replaceAll('_', ' ').toUpperCase()

  const topicId = await prisma.topic.findMany({
    select: {id: true},
    where: {name: topicName?.toUpperCase()}
  })
  .then((topicIDs: Array<any>) => {
    if (topicIDs.length <= 0)
      return new Response(`Invalid topic name ${topicName}`, )

    return topicIDs.at(-1).id
  })
  .catch((err: Error) => err)
  if (topicId instanceof Error)
    return new Response(topicId.message)

  const post = await prisma.post.findFirst({
    select: {
      title: true,
      text: true,
      date: true,
      tags: true
    },
    where: {
      topicId: topicId,
      title: postTitle
    }
  })
  .then((pst) => pst) 
  .catch((err: Error) => err)
  if (post instanceof Error)
    return new Response(post.message)

  return new Response(JSON.stringify({
    'topic': topicName,
    'title': post?.title,
    'text': post?.text.toString(),
    'date': post?.date,
    'tags': post?.tags.split(',')
  }))
})