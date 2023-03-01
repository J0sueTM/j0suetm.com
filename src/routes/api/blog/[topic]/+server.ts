import prisma from '../../db'

export interface GetPostsByTopicResponse {
  title: string
  summary: string
  date: string
  tags: string[]
}

export const GET = (async ({ url }) => {
  const topicName: string = url.pathname.split('/').at(-1)

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
    return new Response(topicId.message, {status: 400})

  const posts = await prisma.post.findMany({
    select: {
      title: true,
      summary: true,
      date: true
    },
    where: {topicId: topicId}
  })
  .then((psts: any[]) => psts)
  .catch((err: Error) => err)
  if (posts instanceof Error)
    return new Response(posts.message, {status: 424})

  let response: GetPostsByTopicResponse[] = []
  posts.forEach((post: any) => {
    response.push({
      title: post.title,
      summary: post.summary,
      date: '',
      tags: []
    } satisfies GetPostsByTopicResponse)
  })

  return new Response(JSON.stringify(posts))
})
