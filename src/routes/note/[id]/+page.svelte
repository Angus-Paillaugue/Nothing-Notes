<script>
	import { onMount } from 'svelte';
  import { Checkbox, Modal, Loader, Hr, Button, Icon } from '$lib/components';
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
    <textarea name="content" bind:value={note.content} bind:this={textarea} onkeyup={() => debounce(1)} class="bg-black text-sm tracking-normal w-full rounded resize-none placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot grow" placeholder='Content'></textarea>
  {:else}
    <!-- List note unchecked items -->
    {#each note.items.filter(el => !el.checked) as item, i (item.id)}
      <div class="flex flex-row gap-2 items-center" >
        <Checkbox bind:checked={item.checked} on:change={saveNote} class="shrink-0" />
        <input type="text" bind:value={item.content} onkeyup={() => debounce(2 + i)} class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" placeholder="Content" style="border: 1px dashed white;">
        <button class="transition-all hover:text-red" onclick={() => {note.items.splice(i, 1); saveNote();}}>
          <Icon name="trash" />
        </button>
      </div>
    {/each}

    <!-- Add line to list note -->
    <button onclick={addItemToList} class="flex flex-row gap-2 p-2 rounded hover:bg-gray transition-all">
      <Icon name="plus" />
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
            <Icon name="trash" />
          </button>
        </div>
      {/each}
    {/if}
  {/if}

  <!-- Bottom bar -->
  <div class="mt-auto flex flex-row gap-2 items-center justify-between h-14 px-2 bg-black fixed bottom-0 left-0 right-0">
    <!-- Change note color button -->
    <button class="p-2 rounded-full {noteBgColors.find(el => el.name === note.color)?.class ?? ''}" onclick={() => {changeNoteColorModalOpen = true;}}>
      <Icon name="palette" class={note.color === "white" && 'text-gray'} />
    </button>

    <!-- Last saved tile and date -->
    <div class="grow flex flex-row h-full items-center justify-center">
      <p class="text-base font-dot">{formatDate(note.lastModified)}</p>
    </div>

    <!-- Open settings button -->
    <button class="rounded-full p-2" onclick={() => {settingsModalOpen = true;}}>
      <Icon name="Settings" />
    </button>

    <!-- Save status -->
    <div class="p-2 rounded-full group relative {!['saving', 'saved'].includes(noteStatus) && 'bg-red'}">
      <div class="absolute bottom-full right-0 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:visible invisible z-30 transition-all">
        <div class="relative p-2 rounded bg-gray">
          Note is {noteStatus}
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-6 absolute top-[calc(100%-0.5rem)] right-2 fill-gray" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </div>
      </div>
      {#if noteStatus === 'saved'}
        <Icon name="cloud" />
      {:else if noteStatus === 'saving'}
        <Icon name="refresh" />
      {:else}
        <Icon name="warning" />
      {/if}
    </div>
  </div>
</div>

<!-- Archive note modal -->
<Modal bind:open={archiveNoteModalOpen} title="Archive note">
  <p>Are you sure you want to archive this note?</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <Button center disabled={isArchivingNote} onclick={() => {archiveNoteModalOpen = false;settingsModalOpen = true;}}>
      Cancel
    </Button>
    <Button center sabled={isArchivingNote} onclick={archiveNote}>
      {#if isArchivingNote}
        <Loader />
      {:else}
        Archive it
      {/if}
    </Button>
  </div>
</Modal>

<!-- Archive note modal -->
<Modal bind:open={deleteNoteModalOpen} title="Delete note">
  <p>Are you sure you want to delete this note? This operation is irreversible!</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <Button center disabled={isDeletingNote} onclick={() => {deleteNoteModalOpen = false;settingsModalOpen = true;}}>
      Cancel
    </Button>
    <Button center disabled={isDeletingNote} onclick={deleteNote}>
      {#if isDeletingNote}
        <Loader />
      {:else}
        Delete it
      {/if}
    </Button>
  </div>
</Modal>

<!-- Change note color modal -->
<Modal bind:open={changeNoteColorModalOpen} title="Note color">
  <div class="flex flex-row gap-4 w-full mt-2">
    <button class="rounded-full size-10 ring-4 bg-black {note.color === 'black' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('black')}}></button>
    <button class="rounded-full size-10 ring-4 bg-red {note.color === 'red' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('red')}}></button>
    <button class="rounded-full size-10 ring-4 bg-white {note.color === 'white' ? 'ring-black' : 'ring-gray'}" onclick={() => {changeNoteColor('white')}}></button>
    <button class="rounded-full size-10 ring-4 bg-blue {note.color === 'blue' ? 'ring-white' : 'ring-gray'}" onclick={() => {changeNoteColor('blue')}}></button>
  </div>
</Modal>

<!-- Settings modal -->
<Modal bind:open={settingsModalOpen}>
  <div class="flex flex-col w-full gap-2">
    <!-- delete note button -->
    <Button onclick={() => {settingsModalOpen = false;deleteNoteModalOpen = true;}}>
      <Icon name="trash" class="size-5" />
      Delete
    </Button>

    <!-- Archive note button -->
    <Button onclick={() => {settingsModalOpen = false;archiveNoteModalOpen = true;}}>
      <Icon name="archive-add" />
      Archive
    </Button>

    <!-- Pin/Unpin note -->
    <Button onclick={togglePin}>
      {#if isChangingPin}
        <Loader />
      {:else}
        {#if note.pinned}
          <Icon name="pin-filled" />
        {:else}
          <Icon name="pin" />
        {/if}
      {/if}
      {note.pinned ? 'Unpin' : 'Pin'}
    </Button>
  </div>
</Modal>
