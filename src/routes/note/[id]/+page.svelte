<script>
	import { onMount } from 'svelte';
  import { Checkbox, Modal, Loader, Hr } from '$lib/components';
  import { formatDate } from '$lib/utils';
  import { noteBgColors } from '$lib/constants';

  const { data } = $props();
  const { id, note } = data;

  const debounceTimer = 1000;

  let timers = $state([ ]);
  let textarea = $state();
  let noteStatus = $state('saved');
  let isDeletingNote = $state(false);
  let isArchivingNote = $state(false);
  let isChangingPin = $state(false);
  // Modals
  let settingsModalOpen = $state(false);
  let changeNoteColorModalOpen = $state(false);
  let archiveNoteModalOpen = $state(false);
  let deleteNoteModalOpen = $state(false);

  onMount(() => {
    // Set textarea's height
    if(note.type === 'text') {
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + "px";
    }

    document.title = note.title;

    // Note title focus if note is empty
    if(note.title === '' && (note.content === '' || note.items.length === 0)) {
      document.querySelector('input[name="title"]').focus();
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

    document.title = note.title;
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

  const deleteNote = async () => {
    isDeletingNote = true;
    const res = await fetch(`/api/deleteNote`, { method: 'POST', body: JSON.stringify({ id }) });

    if (res.ok) {
      isDeletingNote = false;
      window.location.href = '/note';
    }
  }

  const changeNoteColor = color => {
    note.color = color;
    saveNote();
  }

  const archiveNote = async () => {
    isArchivingNote = true;
    note.archived = true;
    await saveNote();
    isArchivingNote = false;
    window.location.href = '/note';
  }

  const togglePin = async () => {
    isChangingPin = true;
    note.pinned = !note.pinned;
    await saveNote();
    isChangingPin = false;
  }
</script>

<!-- Main note elements -->
<div class="p-2 flex flex-col gap-4 min-h-[calc(100vh-3.5rem*2)] mb-14">
  <!-- Note title input -->
  <input type="text" name="title" bind:value={note.title} onkeyup={() => debounce(0)} class="bg-black text-2xl w-full placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Title">

  {#if note.type === 'text'}
    <!-- Main text note textarea -->
    <textarea name="content" bind:value={note.content} bind:this={textarea} onkeyup={() => debounce(1)}  oninput={() => {textarea.style.height = 'auto';textarea.style.height = (textarea.scrollHeight) + "px"}} class="bg-black text-sm tracking-normal w-full rounded resize-none placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot overflow-y-hidden" placeholder='Content' rows='5'></textarea>
  {:else}
    <!-- List note unchecked items -->
    {#each note.items.filter(el => !el.checked) as item, i (item.id)}
      <div class="flex flex-row gap-2 items-center" >
        <Checkbox bind:checked={item.checked} on:change={saveNote} class="shrink-0" />
        <input type="text" bind:value={item.content} onkeyup={() => debounce(2 + i)} class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Content" style="border: 1px dashed white;">
        <button class="transition-all hover:text-red" onclick={() => {note.items.splice(i, 1); saveNote();}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    {/each}

    <!-- Add line to list note -->
    <button onclick={addItemToList} class="flex flex-row gap-2 p-2 rounded hover:bg-gray transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add an element
    </button>

    <!-- Checked list note items -->
    {#if note.items.filter(el => el.checked).length > 0}
      <!-- Separator -->
      <Hr text="Checked" />
      {#each note.items.filter(el => el.checked).reverse() as item, i (item.id)}
        <div class="flex flex-row gap-2 items-center" >
          <Checkbox bind:checked={item.checked} on:change={saveNote} class="shrink-0" />
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

  <!-- Bottom bar -->
  <div class="mt-auto flex flex-row gap-2 items-center justify-between h-14 px-2 bg-black fixed bottom-0 left-0 right-0">
    <!-- Change note color button -->
    <button class="p-2 rounded-full {noteBgColors.find(el => el.name === note.color)?.class ?? ''}" onclick={() => {changeNoteColorModalOpen = true;}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
        <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
        <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7"/>
      </svg>
    </button>

    <!-- Last saved tile and date -->
    <div class="grow flex flex-row h-full items-center justify-center">
      <p class="text-base font-dot">{formatDate(note.lastModified)}</p>
    </div>

    <!-- Open settings button -->
    <button class="rounded-full p-2" onclick={() => {settingsModalOpen = true;}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    </button>

    <!-- Save status -->
    <div class="p-2 rounded-full group relative {!['saving', 'saved'].includes(noteStatus) && 'bg-red'}">
      <div class="absolute bottom-full right-0 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:visible invisible z-30 transition-all">
        <div class="relative p-2 rounded bg-gray">
          Note is {noteStatus}
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 absolute top-[calc(100%-0.5rem)] right-2 fill-gray" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </div>
      </div>
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
  </div>
</div>

<!-- Archive note modal -->
<Modal bind:open={archiveNoteModalOpen}>
  <h2 class="mb-1">Archive note</h2>
  <p>Are you sure you want to archive this note?</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <button class="w-full p-2 rounded bg-black" disabled={isArchivingNote} onclick={() => {archiveNoteModalOpen = false;settingsModalOpen = true;}}>
      Cancel
    </button>
    <button class="w-full p-2 rounded bg-black" disabled={isArchivingNote} onclick={archiveNote}>
      {#if isArchivingNote}
        <Loader />
      {:else}
        Archive it
      {/if}
    </button>
  </div>
</Modal>

<!-- Archive note modal -->
<Modal bind:open={deleteNoteModalOpen}>
  <h2 class="mb-1">Delete note</h2>
  <p>Are you sure you want to delete this note? This operation is irreversible!</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <button class="w-full p-2 rounded bg-black" disabled={isDeletingNote} onclick={() => {deleteNoteModalOpen = false;settingsModalOpen = true;}}>
      Cancel
    </button>
    <button class="w-full p-2 rounded bg-black" disabled={isDeletingNote} onclick={deleteNote}>
      {#if isDeletingNote}
        <Loader />
      {:else}
        Delete it
      {/if}
    </button>
  </div>
</Modal>

<!-- Change note color modal -->
<Modal bind:open={changeNoteColorModalOpen}>
  <h2>Note color</h2>
  <div class="flex flex-row gap-4 w-full mt-2">
    <button class="rounded-full w-10 h-10 ring-4 bg-black {note.color === 'black' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('black')}}></button>
    <button class="rounded-full w-10 h-10 ring-4 bg-red {note.color === 'red' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('red')}}></button>
    <button class="rounded-full w-10 h-10 ring-4 bg-white {note.color === 'white' ? 'ring-black' : 'ring-gray'}" onclick={() => {changeNoteColor('white')}}></button>
    <button class="rounded-full w-10 h-10 ring-4 bg-blue {note.color === 'blue' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('blue')}}></button>
  </div>
</Modal>

<!-- Settings modal -->
<Modal bind:open={settingsModalOpen}>
  <div class="flex flex-col w-full ">

    <!-- delete note button -->
    <button class="w-full text-start flex flex-row items-center gap-2 hover:bg-black p-2 rounded" onclick={() => {settingsModalOpen = false;deleteNoteModalOpen = true;}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-all">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      Delete
    </button>

    <!-- Archive note button -->
    <button class="w-full text-start flex flex-row items-center gap-2 hover:bg-black p-2 rounded" onclick={() => {settingsModalOpen = false;archiveNoteModalOpen = true;}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
      Archive
    </button>

    <!-- Pin/Unpin note -->
    <button class="w-full text-start flex flex-row items-center gap-2 hover:bg-black p-2 rounded" onclick={togglePin}>
      {#if isChangingPin}
        <Loader />
      {:else}
        {#if note.pinned}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146"/>
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z"/>
          </svg>
        {/if}
      {/if}
      {note.pinned ? 'Unpin' : 'Pin'}
    </button>
  </div>
</Modal>
