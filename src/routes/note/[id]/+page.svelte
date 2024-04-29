<script>
	import { onMount } from 'svelte';
  import { Checkbox } from '$lib/components';

  const { data } = $props();
  const { id, note } = data;

  const debounceTimer = 1000;

  let timers = $state([ ]);
  let textarea = $state();
  let noteStatus = $state('saved');

  onMount(() => {
    // Set textarea's height
    if(note.type === 'text') {
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + "px";
    }
  });

  async function saveNote() {
    noteStatus = 'saving';
    const res = await fetch(`/api/${note.type === 'text' ? 'saveTextNote' : 'saveListNote'}`, {
      method: 'POST',
      body: JSON.stringify({ ...note, id })
    });

    if (res.ok) {
      noteStatus = 'saved';
    } else {
      console.log(res);
      noteStatus = 'error';
    }
  }

  const debounce = i => {
    if(i >= timers.length)
      timers = [...timers, 0];

		clearTimeout(timers[i]);
		timers[i] = setTimeout(() => {
			saveNote();
		}, debounceTimer);
	}

  const addItemToList = () => {
    note.items.push({ content: '', checked: false, id:crypto.randomUUID() });
    saveNote();
  }
</script>

<div class="p-2 flex flex-col gap-4">
  <input type="text" name="title" bind:value={note.title} onkeyup={() => debounce(0)} class="bg-black px-4 py-2 text-2xl w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Title" style="border: 1px dashed white;">

  {#if note.type === 'text'}
    <textarea name="content" bind:value={note.content} bind:this={textarea} onkeyup={() => debounce(1)}  oninput={() => {textarea.style.height = 'auto';textarea.style.height = (textarea.scrollHeight) + "px"}} class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded resize-none placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot overflow-y-hidden" placeholder='Content' style="border: 1px dashed white;field-sizing: normal;" rows='5'></textarea>
  {:else}
    {#each note.items.filter(el => !el.checked) as item, i (item.id)}
      <div class="flex flex-row gap-2 items-center" >
        <Checkbox bind:checked={item.checked} on:change={saveNote} class="w-6 h-6" />
        <input type="text" bind:value={item.content} onkeyup={() => debounce(2 + i)} class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Content" style="border: 1px dashed white;">
        <button class="transition-all hover:text-red" onclick={() => {note.items.splice(i, 1); saveNote();}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    {/each}
    <button onclick={addItemToList} class="flex flex-row gap-2 p-2 rounded hover:bg-gray transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add an element
    </button>

    {#if note.items.filter(el => el.checked).length > 0}
      <!-- Separator -->
      <div class="flex flex-row items-center gap-4">
        <span class="w-full border-b border-gray"></span>
        Checked
        <span class="w-full border-b border-gray"></span>
      </div>
      {#each note.items.filter(el => el.checked).reverse() as item, i (item.id)}
      <div class="flex flex-row gap-2 items-center" >
        <Checkbox bind:checked={item.checked} on:change={saveNote} class="w-6 h-6" />
        <input type="text" bind:value={item.content} onkeyup={() => debounce(2 + note.items.length + i)} class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Content" style="border: 1px dashed white;">
        <button class="transition-all hover:text-red" onclick={() => {note.items.splice(i, 1); saveNote();}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    {/each}
    {/if}
  {/if}
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
