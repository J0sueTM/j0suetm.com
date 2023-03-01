<script lang="ts">
  import actually from '$lib/assets/actually.jpeg'
  import { onMount } from 'svelte';
  import Button from '../Button.svelte';

  export let wait: number

  export let topic: string
  export let title: string
  export let summary: string
  export let date: Date

  let canRender: boolean = false
  onMount(() => {
    setTimeout(() => {canRender = true}, wait + 200)
  })
</script>

<div class="translate-y-0 w-full h-80 p-4 flex flex-col justify-between border-b-2 border-dark transition-all
            sm:border-2"
     class:translate-y-8={!canRender}
     class:opacity-0={!canRender}>
  <div class="w-full h-1/3 flex flex-row">
    <img class="w-1/3 h-full object-cover border-2 border-dark" src={actually} alt="hp">
    <p class="w-full h-full pl-4 flex items-center text-2xl">{title.toUpperCase()}</p>
  </div>
  <p class="w-full flex justify-center items-center text-md indent-4 line-clamp-5">{summary}</p>
  <div class="w-full h-10 flex flex-row">
    <p class="w-8/12 h-full flex items-center text-xs">{date.toDateString()}</p>
    <Button class="w-full group flex justify-center items-center bg-white border-2 border-dark
                   hover:bg-dark hover:text-white" text="Read" href={`/blog/${topic}/${title.toLowerCase().replaceAll(' ', '_')}`} blank={false}/>
  </div>
</div>