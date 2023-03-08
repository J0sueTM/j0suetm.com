<script lang="ts">
  import Loader from "$lib/components/Loader.svelte";
  import Header from "$lib/components/Header.svelte";
  import PostRenderer from '$lib/components/blog/PostRenderer.svelte'
  import { MetaTags } from 'svelte-meta-tags'

  interface BlogPostParams {
    topic: string;
    post: string;
  }

  export let data: BlogPostParams;

  const getPost = async () => {
    const res = await fetch(`/api/blog/${data.topic}/${data.post}`);

    if (res.ok)
      return await res.json()
    else
      return await res.text()
  };
</script>

<MetaTags
  title={data.post.replaceAll('_', ' ').toUpperCase()}
  titleTemplate="J0sueTM | %s"
  description={`A blog post about ${data.topic} by J0sueTM`}
  openGraph={{
    url: 'https://j0suetm.com',
    images: [
      {
        url: 'https://j0suetm.com/_app/immutable/assets/pfp-158d20f9.jpg',
        width: 360,
        height: 360,
        alt: 'thumbnail'
      }
    ]
  }}
  twitter={{
    handle: '@summary',
    site: '@j0suetm',
    cardType: 'summary',
    title: data.post.replaceAll('_', ' ').toUpperCase(),
    image: 'https://j0suetm.com/_app/immutable/assets/pfp-158d20f9.jpg',
    imageAlt: 'thumbnail'
  }}
/>

<Header title={data.topic} />
<main class="fixed w-full h-full left-0 top-0 pt-16 flex flex-row z-30">
  {#await getPost()}
    <Loader />
  {:then post}
    {#if post === null || post === undefined}
      <p class="w-min mx-auto">Could not load post...</p>
    {:else}
      <PostRenderer isEditing={false} topic={post.topic} text={post.text} title={post.title} date={new Date(post.date)} tags={post.tags}/>
    {/if}
  {:catch error}
    {error.message}
  {/await}
</main>
