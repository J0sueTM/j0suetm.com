<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import Loader from '$lib/components/Loader.svelte'
</script>

<Header title="blog"/>
<main class="fixed w-screen h-screen left-0 top-0 pt-16 grid grid-cols-1 grid-rows-4 z-30
              md:grid-cols-4 md:grid-rows-1">
  <a
    id="technology"
    class="w-full h-full flex justify-center items-center group border-b-2 border-dark
            md:border-b-0 md:border-r-2"
    href="/blog/technology"
  >
    <p class="w-min px-6 py-3 text-4xl bg-white
              group-hover:border-2 group-hover:border-dark">
      TECHNOLOGY
    </p>
  </a>
  <a
    id="opinion"
    class="w-full h-full flex justify-center items-center group border-b-2 border-dark
            md:border-b-0 md:border-r-2"
    href="/blog/opinion"
  >
    <p class="w-min px-6 py-3 text-4xl bg-white
              group-hover:border-2 group-hover:border-dark">
      OPINION
    </p>
  </a>
  <a
    id="marketing"
    class="w-full h-full flex justify-center items-center group border-b-2 border-dark
            md:border-b-0 md:border-r-2"
    href="/blog/marketing"
  >
    <p class="w-min px-6 py-3 text-4xl bg-white
              group-hover:border-2 group-hover:border-dark">
      MARKETING
    </p>
  </a>
  <a
    id="finances"
    class="w-full h-full flex justify-center items-center group border-b-2 border-dark
            md:border-b-0 md:border-r-2"
    href="/blog/finances"
  >
    <p class="w-min px-6 py-3 text-4xl bg-white
              group-hover:border-2 group-hover:border-dark">
      FINANCES
    </p>
  </a>
</main>

<style>
  #technology:hover {
    background-image: url('../../lib/assets/blog-tech.jpg');
    background-position: center;
    background-size: cover;
  }

  #opinion:hover {
    background-image: url('../../lib/assets/blog-opinion.jpg');
    background-position: center;
    background-size: cover;
  }

  #marketing:hover {
    background-image: url('../../lib/assets/blog-marketing.jpg');
    background-size: cover;
  }

  #finances:hover {
    background-image: url('../../lib/assets/blog-finances.jpg');
    background-size: cover;
  }
</style>
