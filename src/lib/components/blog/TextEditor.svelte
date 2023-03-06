<script lang="ts">
  export let publishPost: any
  export let postText: string = ''
</script>

<div class="w-full h-full flex flex-col">
  <header class="w-full h-10 flex flex-row justify-between border-b-2 border-dark">
    <div class="h-full px-4 py-2 flex flex-row space-x-4 border-r-2 border-dark">
      <button class="h-full pr-4 border-r-2 border-dark">
        <svg class="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M360.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/>
        </svg>
      </button>
      <button class="h-full">
        <svg class="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
        </svg>
      </button>
    </div>
   <button
      class="h-full px-4 border-l-2 border-dark
           hover:bg-dark hover:text-white"
      on:click={publishPost()}
    >
      PUBLISH
    </button>
  </header>
  <textarea
    id="blog-text"
    class="h-full px-4 py-2 outline-none overflow-y-auto"
    placeholder="Write blog post..."
    bind:value={postText}
  ></textarea>
</div>