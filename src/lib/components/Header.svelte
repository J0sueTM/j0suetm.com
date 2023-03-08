<script lang="ts">
  import { onMount } from "svelte";

  export let title: string = 'J0sueTM'

  let isMenuHidden: boolean = true
  let windowWidth: number = 0
  $: isMenuHiddenFinal = isMenuHidden && windowWidth < 768
  onMount(() => {
    windowWidth = window.innerWidth

    window.addEventListener('resize', () => {
      windowWidth = window.innerWidth
    })
  })
</script>

<header class="w-screen h-16 grid grid-cols-12 border-b-2 border-dark text-dark bg-white">
  <a
    class="col-span-3 h-full flex justify-center items-center text-md border-r-2 border-dark z-50
            sm:col-span-2
            lg:col-span-1"
    href="/"
  >
    J0sueTM
  </a>
  <p class="col-span-7 h-full flex justify-center items-center text-3xl border-r-2 border-dark z-50
            sm:col-span-8
            md:col-span-6
            lg:col-span-7
            ">
    {title.toUpperCase()}
  </p>
  <div
    class="col-span-2 h-full flex group justify-center items-center text-lg cursor-pointer z-50
           md:hidden
           hover:bg-dark"
    on:click={() => {isMenuHidden = !isMenuHidden}} on:keydown={() => {}}
  >
    <svg
      class="w-5 fill-dark
             group-hover:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      >
      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
    </svg>
  </div>

  <!-- menu -->
  <div
    class="fixed w-full h-full pt-16 grid grid-rows-3 text-4xl bg-white z-40
           md:relative md:w-full md:h-16 md:pt-0 md:col-span-4 md:grid-rows-1 md:grid-cols-6 md:text-2xl"
    class:hidden={isMenuHiddenFinal}
  >
    <a
      class="w-full flex justify-center items-center border-b-2 border-t-2 border-dark cursor-pointer
             md:hidden
             hover:bg-dark hover:text-white"
      href="/"
      on:click={() => {isMenuHidden = !isMenuHidden}}
    >
      HOME
    </a>
    <a
      class="w-full flex justify-center items-center border-b-2 border-dark cursor-pointer
             md:h-full md:col-span-2 md:border-r-2
             lg:col-span-3
             hover:bg-dark hover:text-white"
      href="/blog"
      on:click={() => {isMenuHidden = !isMenuHidden}}
    >
      BLOG
    </a>
    <a
      class="w-full flex justify-center items-center border-b-2 border-dark cursor-pointer
             md:h-full md:col-span-4
             lg:col-span-3
             hover:bg-dark hover:text-white"
      href="https://github.com/j0suetm"
      on:click={() => {isMenuHidden = !isMenuHidden}}
    >
      PORTFOLIO
    </a>
  </div>
</header>
