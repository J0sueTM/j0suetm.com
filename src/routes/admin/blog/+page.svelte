<script lang="ts">
  import PostRenderer from '$lib/components/blog/PostRenderer.svelte';
import TextEditor from '$lib/components/blog/TextEditor.svelte';
  import Header from '$lib/components/Header.svelte'

  let postText: string
</script>

<Header title="WRITE"/>
<main class="fixed w-screen h-screen left-0 top-0 pt-16 flex flex-col z-30
             md:flex-row">
  <div class="w-full h-full border-b-2 border-dark
              md:w-2/5 md:border-b-0 md:border-r-2">
    <TextEditor bind:postText={postText}/>
  </div>
  <div class="w-full h-full
              md:w-3/5">
    <PostRenderer topic="technology" text={postText} title="HOW TO DO SOMETHING" date={new Date(Date.now())} tags={['Go', 'Svelte']}/>
  </div>
</main>