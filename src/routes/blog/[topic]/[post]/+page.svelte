<script lang="ts">
  import Loader from "$lib/components/Loader.svelte";
  import Header from "$lib/components/Header.svelte";
  import PostRenderer from '$lib/components/blog/PostRenderer.svelte'

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

<Header title={data.topic} />
<main class="fixed w-screen h-screen left-0 top-0 pt-16 flex flex-row z-30">
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
