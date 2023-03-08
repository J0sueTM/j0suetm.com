<script lang="ts">
  import { goto } from '$app/navigation';
  import PostRenderer from '$lib/components/blog/PostRenderer.svelte';
  import TextEditor from '$lib/components/blog/TextEditor.svelte';
  import Header from '$lib/components/Header.svelte'

  let postTopic: string = 'technology'
  let postTitle: string = 'NEW POST'
  let postDate: Date = new Date(Date.now())
  let postTags: string[] = []
  let postText: string = ''

  const publishPost = async () => {
    const res = await fetch(`/api/admin/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': document.cookie.split(';')[0].replaceAll('Authorization: Bearer ', '')
      },
      body: JSON.stringify({
        'topic': postTopic.toUpperCase(),
        'title': postTitle,
        'date': postDate,
        'tags': postTags,
        'text': postText
      })
    })

    if (res.ok)
      goto(`/blog/${postTopic}/${postTitle.toLowerCase().replaceAll(' ', '_')}`)
    else
      console.log(await res.text())
  }
</script>

<Header title="WRITE"/>
<main class="fixed w-full h-full left-0 top-0 pt-16 flex flex-col z-30
             md:flex-row">
  <div class="w-full h-full border-b-2 border-dark
              md:w-2/5 md:border-b-0 md:border-r-2">
    <TextEditor {publishPost} bind:postText={postText}/>
  </div>
  <div class="w-full h-full
              md:w-3/5">
    <PostRenderer isEditing={true} bind:topic={postTopic} text={postText} bind:title={postTitle} date={postDate} bind:tags={postTags}/>
  </div>
</main>