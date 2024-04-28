<script>
  const { data } = $props();
  const { id, note } = data;

  const debounceTimer = 1000;

  let titleTimer = $state(0);
  let contentTimer = $state(0);
  let textarea = $state();
  let noteStatus = $state('saved');

  async function saveNote() {
    noteStatus = 'saving';
    const res = await fetch(`/api/saveNote`, {
      method: 'POST',
      body: JSON.stringify({ ...note, id })
    });

    if (res.ok) {
      noteStatus = 'saved'
    } else {
      console.log(res)
      noteStatus = 'error'
    }
  }

  const debounceTitle = v => {
		clearTimeout(titleTimer);
		titleTimer = setTimeout(() => {
			saveNote()
		}, debounceTimer);
	}

  const debounceContent = v => {
		clearTimeout(contentTimer);
		contentTimer = setTimeout(() => {
			saveNote()
		}, debounceTimer);
	}
</script>

<div class="p-2 flex flex-col gap-4">
  <input type="text" name="title" bind:value={note.title} onkeyup={({ target: { value } }) => debounceTitle(value)} class="bg-bg px-4 py-2 text-2xl w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Title" style="border: 1px dashed white;">

  <textarea name="content" bind:value={note.content} bind:this={textarea} onkeyup={({ target: { value } }) => debounceContent(value)}  oninput={() => {textarea.style.height = 'auto';textarea.style.height = (textarea.scrollHeight) + "px"}} class="bg-bg px-2 py-1 text-sm tracking-tight w-full rounded resize-none placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot overflow-y-hidden" placeholder='Content' style="border: 1px dashed white;field-sizing: normal;" rows='10'></textarea>
</div>

<div class="absolute bottom-2 right-2 p-2 rounded-full {noteStatus === 'saving' || noteStatus === 'saved' ? 'bg-gray' : 'bg-red'}">
  {#if noteStatus === 'saved'}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
  {:else if noteStatus === 'saving'}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  {/if}
</div>
