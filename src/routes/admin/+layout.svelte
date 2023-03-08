<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { onMount } from "svelte";

  let username: string = ''
  let password: string = ''

  let isAuthenticated: boolean = false
  let message: string = ''

  let jwtToken: string | undefined
  onMount(async () => {
    const tokens = document.cookie.split(';').filter(c => c.includes('Authorization'))
    if (tokens.length !== 1)
      return

    jwtToken = tokens[0].replaceAll('Authorization: Bearer ', '')
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken
      },
      body: JSON.stringify({
        'jwtToken': jwtToken
      })
    })

    if (res.ok)
      isAuthenticated = (await res.json()).result
  })

  const login = async () => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken!
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    if (res.ok) {
      const e = await res.json()
      jwtToken = e.token

      document.cookie = `Authorization: Bearer ${jwtToken}`

      isAuthenticated = e.result
    }
    else
      message = await res.text()
  }
</script>

{#if !isAuthenticated}
  <Header title="LOGIN"/>
  <main class="fixed w-full h-full left-0 top-0 pt-16 flex flex-row z-30">
    <div class="w-1/2 h-full mx-auto flex flex-col justify-center
                md:w-1/3
                lg:w-1/4">
      <p class="text-md">User</p>
      <input class="px-2 py-1 border-2 border-dark" type="text" bind:value={username}>

      <p class="mt-4 text-md">Password</p>
      <input class="px-2 py-1 border-2 border-dark outline-none" type="password" bind:value={password}>

      <button
        class="mt-4 py-2 border-2 border-dark
            hover:bg-dark hover:text-white"
        on:click={login}
      >
        Login ->
      </button>
      <p class="mt-2 mx-auto text-red-500">{message}</p>
    </div>
  </main>
{:else}
  <slot/>
{/if}