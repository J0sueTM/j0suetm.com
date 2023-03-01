<script lang="ts">
  import Header from '$lib/components/Header.svelte'

  const topics: string[] = ['TECHNOLOGY', 'OPINION', 'MARKETING', 'FINANCES']
</script>

<Header title="ADMIN"/>
<main class="fixed w-screen h-screen left-0 top-0 pt-16 flex flex-col z-30
             md:flex-row">
  <a class="w-full h-full group flex justify-center items-center border-r-2 border-dark" href="/admin/blog">
    <p class="w-min px-4 py-1 border-2 border-dark text-6xl
              group-hover:bg-dark group-hover:text-white">WRITE</p>
  </a>
  <div class="w-full h-full border-r-2 border-dark">
    <div class="w-1/2 h-full mx-auto group flex flex-col justify-center items-center">
      <p class="w-full px-4 py-1 flex justify-center items-center border-2 border-dark text-6xl">MANAGE</p>
      {#each topics as topic}
        <a class="hidden w-full px-2 mt-4 py-px justify-center items-center border-2 border-dark text-3xl
                  hover:bg-dark hover:text-white
                  group-hover:flex"
          href={`/blog/${topic.toLowerCase()}?isManaging=true`}>
          {topic}
        </a>
      {/each}
    </div>
  </div>
</main>