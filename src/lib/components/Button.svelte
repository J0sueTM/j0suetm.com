<script lang="ts">
  export let text: string
  export let href: string
  export let blank: boolean

  let extraClass: string
  export { extraClass as class }
</script>

<a
  class={
    (extraClass != '')
      ? extraClass
      : "w-full h-full group flex justify-center items-center text-lg bg-white border-r-2 border-dark sm:border-r-0 border-b-2 hover:bg-dark hover:text-white"
  }
  {href} target={(blank) ? "_blank" : "_self"} rel="noreferrer"
>
  {text}
  <p class="hidden ml-2
            group-hover:block">
    ->
  </p>
</a>