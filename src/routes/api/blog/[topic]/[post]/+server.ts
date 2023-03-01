import prisma from '../../../db'

export interface GetPostResponse {
  title: string
  text: string
  date: string
  tags: string[]
}

export const GET = (async ({ url }) => {
  const topicName: string = url.pathname.split('/').at(-2)
  let postTitle: string = url.pathname.split('/').at(-1)
  postTitle = postTitle.slice(0, 1).toUpperCase() + postTitle.slice(1).replaceAll('_', ' ')
  console.log(postTitle)

  const topicId = await prisma.topic.findMany({
    select: {id: true},
    where: {name: topicName?.toUpperCase()}
  })
  .then((topicIDs: Array<any>) => {
    if (topicIDs.length <= 0)
      return new Error(`Invalid topic name ${topicName}`)

    return topicIDs.at(-1).id
  })
  .catch((err: Error) => err)
  if (topicId instanceof Error)
    return new Response(topicId.message)

  const post = await prisma.post.findFirst({
    select: {
      title: true,
      text: true,
      date: true
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

  return new Response(JSON.stringify(post))
})