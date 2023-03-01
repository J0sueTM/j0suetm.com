<script lang='ts'>
  import { onMount } from 'svelte'
  import Loader from '../Loader.svelte'
  import { textToMarkdown, type MdToken } from './markdown'

  import actually from '$lib/assets/actually.jpeg'
  import { each } from 'svelte/internal';

  export let topic: string
  export let title: string
  export let date: Date
  export let tags: string[]

  export let text: string
  let parsedText: MdToken[] = []

  let canRender: boolean = false
  onMount(() => {
    canRender = true
  })

  $: if (text) {
    const res: any = textToMarkdown(text)
    if (res instanceof Error)
      parsedText = [
        {
          type: 'error',
          modifier: '',
          data: res.message
        }
      ]
    else
      parsedText = res
  }
</script>

{#if !canRender}
  <Loader></Loader>
{:else}
  <div class="w-full h-full flex flex-col overflow-y-auto">
    <button class="fixed w-full h-10 px-2 flex flex-row justify-center items-center border-b-2 border-dark
                   md:hidden">
      <svg class="w-6 h-6 fill-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
      </svg>
      <p class="ml-2 text-sm">Show navigation</p>
    </button>
    <div class="w-full mt-10 flex flex-col overflow-y-auto overflow-x-hidden
                md:mt-0">
      <div class="w-full flex flex-col
                  sm:flex-row sm:mx-4 sm:mt-4
                  md:w-11/12 md:mx-auto
                  lg:w-4/5">
        <img
          class="w-full h-24 mx-auto border-b-2 border-dark object-cover
                sm:w-1/5 sm:border-2"
          src={actually}
          alt="actually"
        />
        <p class="w-full mt-2 mx-4 text-5xl tracking-tight
                  sm:mt-0">{title.toUpperCase()}</p>
      </div>
      <div class="w-full mt-2 px-4 flex flex-row
                  md:px-6
                  lg:w-5/6 lg:mx-auto lg:px-4">
        <p class="w-full h-min mt-3 text-xs">{new Date(date).toDateString()}</p>
        <div class="w-full flex flex-row justify-end space-x-2">
          {#each tags as tag}
            <a
              class="px-2 py-px border-2 border-dark"
              href={`/blog/${topic}?tag=${tag.toLowerCase()}`}>#{tag}</a
            >
          {/each}
        </div>
      </div>
      <div class="w-full mt-2 px-4 py-2 flex flex-col space-y-2">
        {#each parsedText as t}
          {#if t.type === 'text'}
            <p class={`w-full text-${t.modifier}`}>
              {t.data}
            </p>
          {:else if t.type === 'code'}
            <textarea
              class="code w-full mx-auto px-4 py-2 flex flex-col bg-dark text-white resize-none overflow-hidden outline-none"
              readonly
              rows={t.data.split('\n').length - 1}
            >
{t.data}
            </textarea>
          {:else}
            error
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .code::selection {
    background: #ffffff;
    color: #222323;
  }

</style>