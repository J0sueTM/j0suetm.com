<script lang='ts'>
  import { onMount } from 'svelte'
  import Loader from '../Loader.svelte'
  import { textToMarkdown, type MdToken } from './markdown'

  export let isEditing: boolean = false
  export let topic: string = 'technology'
  export let title: string = 'NEW POST'
  export let date: Date = new Date(Date.now())
  export let tags: string[] = []

  let topicOpts: string[] = ['technology', 'opinion', 'marketing', 'finances']

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

<Loader>
  <div class="w-full h-full mx-auto flex flex-col overflow-y-auto
              md:w-4/5
              lg:w-3/5">
   <div class="w-full flex flex-col overflow-y-auto overflow-x-hidden
                md:mt-0">
      {#if isEditing}
        <select class="w-1/2 h-10 mx-auto mt-4 border-2 border-dark bg-white" bind:value={topic} name="topics" id="topics">
          {#each topicOpts as topic}
            <option value={topic}>{topic.toUpperCase()}</option>
          {/each}
        </select>

        <textarea
          class="w-full px-16 py-2 text-5xl tracking-tight resize-none
                 sm:mt-0
                 md:h-32"
          contenteditable={isEditing}
          bind:value={title}
        ></textarea>
      {:else}
        <p
          class="w-full px-4 pt-4 py-2 text-5xl tracking-tight resize-none
                 md:px-16"
        >{title.toUpperCase()}</p>
      {/if}
     <div class="w-full mt-2 px-4 flex flex-row
                  md:px-6
                  lg:w-5/6 lg:mx-auto lg:px-4">
        <p class="w-full h-min mt-3 text-xs">{date.toDateString()}</p>
        <div class="w-full flex flex-row justify-end space-x-2">
          {#each tags as tag, i}
            <div class="group w-min flex flex-row">
              <p
                class="w-min h-min px-2 py-px border-2 border-dark"
                contenteditable={isEditing}
                on:input={(ev) => {
                  tags[i] = (ev.data === null) ? '' : tag + ev.data
                  tags = tags
                }}
              >{tag}</p>
              {#if isEditing}
                <button
                  class="hidden w-min h-full px-2 justify-center items-center border-2 border-l-0 border-dark
                        group-hover:flex"
                  on:click={() => {
                    tags.splice(i, 1)
                    tags = tags
                  }}
                >X</button>
              {/if}
            </div>
          {/each}
          {#if isEditing}
            <button
              class="px-2 py-px border-2 border-dark
                  hover:bg-dark hover:text-white"
              on:click={() => {
                tags.push(`${tags.length}`)
                tags = tags
              }}
            >+</button>
          {/if}
        </div>
      </div>
      <div class="w-full mt-2 px-4 py-2 flex flex-col space-y-2">
        {#each parsedText as t}
          {#if t.type === 'code'}
            <div class="w-full flex flex-col space-y-1">
              <p class="w-full px-4 py-1 bg-dark text-white text-xs">{t.modifier}</p>
              <textarea
                class="code w-full mx-auto px-4 py-2 flex flex-col bg-dark text-white whitespace-pre resize-none overflow-y-hidden outline-none"
                readonly
                rows={t.data.split('\n').length}
              >{t.data}</textarea>
            </div>
          {:else if t.type === 'text'}
            <p id={(t.modifier !== 'sm') ? t.data.replaceAll(' ', '_').toLowerCase() : ''} class={`w-full text-${t.modifier}`}>
              {t.data}
            </p>
          {:else if t.type === 'topic'}
            <div class="w-full px-{t.modifier} flex flex-row space-x-2">
              <svg class="w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
              </svg>
              <p class={`w-full`}>
                {t.data}
              </p>
            </div>
          {:else}
            error
          {/if}
        {/each}
      </div>
    </div>
  </div>
</Loader>

<style>
  .code::selection {
    background: #ffffff;
    color: #222323;
  }

</style>