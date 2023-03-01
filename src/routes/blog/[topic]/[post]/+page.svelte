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

    if (res.ok) return await res.json();
    else return await res.text();
  };

  const tags: string[] = ["Go", "Svelte"];
</script>

<Header title={data.topic} />
<main class="fixed w-screen h-screen left-0 top-0 pt-16 flex flex-row z-30">
  {#await getPost()}
    <Loader />
  {:then post}
    <PostRenderer text={data.post.text}/>
  {:catch error}
    {error.message}
  {/await}
</main>
