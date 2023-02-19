<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import Loader from '$lib/components/Loader.svelte'

  import Pfp from '$lib/assets/pfp.jpg'

  let stack: string[] = ['Backend', 'DBA', 'Staff', 'Go', 'React', 'Svelte']
</script>

<Loader>
  <Header title="home"/>
  <main class="fixed w-screen h-screen left-0 top-0 pt-16 grid grid-cols-12 grid-rows-6 z-30">
    <div
      id="splash"
      class="w-full px-10 py-6 col-span-12 row-span-2 flex flex-row justify-center items-center border-b-2 border-dark
             sm:row-span-3
             md:col-span-8 md:border-r-2"
    >
      <img class="h-full border-2 border-dark" src={Pfp} alt="pfp">
      <p class="w-min h-full pl-10 pr-6 flex justify-center items-center text-end text-3xl leading-snug bg-white border-2 border-l-0 border-dark
                sm:text-4xl sm:leading-snug
                lg:text-5xl lg:leading-snug">JOSUÉ <br/> TEODORO <br/> MOREIRA</p>
    </div>
    <div class="w-full px-6 col-span-12 row-span-2 flex flex-col justify-center items-center border-b-2 border-dark
                sm:col-span-7 sm:row-span-4 sm:border-b-0 sm:border-r-2
                md:px-10 md:col-span-8 md:text-lg
                lg:px-20">
      <p class="">
        Hi, I’m a curious and enthusiastic Software Developer based in SP, Brazil. I work mainly with Backend and Low Level, but also as a FullStack Developer. At the end of the day, if it's code, I'm the guy you should call. ->
      </p>
      <div class="w-full mt-2 flex flex-wrap space-x-2">
        {#each stack as tech}
	        <div class="w-min h-min px-2 py-1 border-2 border-dark">
            <p class="text-xs">{tech}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="w-full h-full col-span-12 row-span-2 grid grid-cols-2 grid-rows-2
                sm:col-span-5 sm:row-span-4 sm:grid-cols-1 sm:grid-rows-4
                md:col-span-4 md:row-span-6 md:col-start-9 md:row-start-1">
      <a
        class="w-full h-full flex justify-center items-center text-lg bg-white border-r-2 border-dark
               sm:border-r-0 border-b-2
               hover:bg-dark hover:text-white"
        href="https://linkedin.com/in/josue-teodoro-moreira" target="_blank" rel="noreferrer"
      >
        LINKEDIN
      </a>
      <a
        class="w-full h-full flex justify-center items-center text-lg bg-white border-b-2 border-dark
               hover:bg-dark hover:text-white"
        href="https://linkedin.com/in/josue-teodoro-moreira" target="_blank" rel="noreferrer"
      >
        GITHUB
      </a>
      <a
        class="w-full h-full flex justify-center items-center text-lg bg-white border-r-2 border-dark
               sm:border-r-0 sm:border-b-2
               hover:bg-dark hover:text-white"
        href="https://linkedin.com/in/josue-teodoro-moreira" target="_blank" rel="noreferrer"
      >
        TWITTER
      </a>
      <a
        class="w-full h-full flex justify-center items-center text-lg bg-white border-dark
               hover:bg-dark hover:text-white"
        href="https://linkedin.com/in/josue-teodoro-moreira" target="_blank" rel="noreferrer"
      >
        INSTAGRAM
      </a>
    </div>
  </main>
</Loader>

<style>
  #splash {
    background-image: url('../lib/assets/concrete-bg.jpg');
    background-size: cover;
  }
</style>
