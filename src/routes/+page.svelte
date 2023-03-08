<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import Button from '$lib/components/Button.svelte'

  import Pfp from '$lib/assets/pfp.jpg'

  let stack: string[] = ['Backend', 'DBA', 'Staff', 'Go', 'React', 'Svelte']
</script>

<Loader>
  <Header title="home"/>
  <main class="fixed w-full h-full left-0 top-0 pt-16 grid grid-cols-12 grid-rows-6 z-30">
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
                md:px-10 md:col-span-8
                lg:px-20">
      <p class="text-sm items-end
                md:text-lg">
        Hi! I'm a software developer based in São Paulo, specializing in Backend and Low Level Programming, as well as Full Stack development. Whether you need a custom application or want to enhance your existing software, I'm your guy. Let's bring your ideas to life with clean, efficient code, hit me up.
        <span class="sm:hidden">|&lt;</span>
        <span class="hidden sm:inline-block">-></span>
      </p>
      <div class="hidden
                  sm:w-full sm:mt-2 sm:grid sm:grid-cols-3 sm:gap-3
                  md:flex flex-wrap">
        {#each stack as tech}
	        <div class="w-full h-min px-2 py-1 border-2 border-dark
                      md:w-min">
            <p class="flex justify-center items-center text-xs">{tech}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="w-full h-full col-span-12 row-span-2 grid grid-cols-2 grid-rows-2
                sm:col-span-5 sm:row-span-4 sm:grid-cols-1 sm:grid-rows-4
                md:col-span-4 md:row-span-6 md:col-start-9 md:row-start-1">
     <Button class="" text="LINKEDIN" href="https://linkedin.com/in/josue-teodoro-moreira" blank={true}/>
     <Button class="" text="GITHUB" href="https://github.com/j0suetm" blank={true}/>
     <Button class="" text="TWITTER" href="https://twitter.com/j0suetm" blank={true}/>
     <Button class="" text="INSTAGRAM" href="https://instagram.com/j0suetm" blank={true}/>
    </div>
  </main>
</Loader>

<style>
  #splash {
    background-image: url('../lib/assets/concrete-bg.jpg');
    background-size: cover;
  }
</style>
