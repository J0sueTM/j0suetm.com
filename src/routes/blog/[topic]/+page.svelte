<script lang="ts">
  import PostCard from '$lib/components/blog/PostCard.svelte';
  import Header from '$lib/components/Header.svelte'
  import Loader from '$lib/components/Loader.svelte'

  interface BlogTopicPostsParams {
    topic: string
  }

  export let data: BlogTopicPostsParams

  const getPosts = async () => {
    const res = await fetch(`/api/blog/${data.topic}`)

    if (res.ok)
      return await res.json()
    else
      return await res.text()
  }

  let wait: number = 0
</script>

<Header title={data.topic}/>
<main class="fixed w-full h-full left-0 top-0 pt-16 grid grid-cols-1 z-30">
  {#await getPosts()}
    <Loader></Loader>
  {:then posts} 
    {#if posts.length <= 0}
      <p class="w-full mt-2 flex justify-center items-center">No posts found in this topic...</p>
    {:else}
      <div class="w-full h-full grid grid-cols-1 overflow-y-auto
                  sm:p-2 sm:grid-cols-2 sm:gap-2
                  lg:grid-cols-3
                  xl:grid-cols-4">
        {#each posts as post, i}
          <PostCard wait={wait + (i * 100)} topic={data.topic} title={post.title} summary={post.summary} date={new Date(post.date)}/>
        {/each}
      </div>
    {/if}
  {:catch error}
    {error.message}
  {/await}
</main>
