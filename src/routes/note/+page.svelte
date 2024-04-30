<script>
  import { Checkbox, Modal } from '$lib/components';
  // import { longPress } from './longPress';

  const { data } = $props();

  const noteBorderColors = [
    {
      name: 'red',
      class: 'ring-red'
    },
    {
      name: 'black',
      class: 'ring-gray'
    },
    {
      name: 'white',
      class: 'ring-white'
    },
    {
      name: 'blue',
      class: 'ring-blue'
    }
  ];

  let notes = $state(data.notes);
  let newNoteModalOpen = $state(false);
  let archivedNotesModalOpen = $state(false);

  async function saveNote(note) {
    const res = await fetch(`/api/${note.type === 'text' ? 'saveTextNote' : 'saveListNote'}`, {
      method: 'POST',
      body: JSON.stringify(note)
    });

    if (!res.ok)
      console.log(res);
  }
</script>

<svelte:head>
  <title>Nothing notes</title>
</svelte:head>

<div class="grid gap-4 w-full p-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
  {#each notes.filter(el => !el.archived) as note (note.id)}
    <a
      href="/note/{note.id}"
      class="flex flex-col p-4 gap-2 rounded transition-all border border-gray ring-2 bg-black relative group {noteBorderColors.find(el => el.name === note.color)?.class ?? 'ring-0'}"
    >
      <h2>{note.title}</h2>
      {#if note.type === 'list'}
        <ul>
          {#each note.items.slice(0, 4) as item}
            <li class="line-clamp-1 flex flex-row items-center gap-2">
              <Checkbox checked={item.checked} class="w-4 h-4" />
              <p class="text-sm">{item.content}</p>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="line-clamp-5 text-sm">{note.content}</p>
      {/if}
    </a>
  {/each}
</div>

<div class="fixed bottom-4 left-1/2 -translate-x-1/2">
  <button onclick={() => {newNoteModalOpen = true;}} class="rounded-full bg-red p-4 flex flex-col items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>

{#if notes.filter(note => note.archived).length > 0}
  <button class="fixed bottom-4 right-4 rounded-full bg-gray p-2" onclick={() => {archivedNotesModalOpen = true;}}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  </button>

  <!-- Archived notes modal -->
  <Modal bind:open={archivedNotesModalOpen} title="Archived notes">
    <h2 class="mb-2">Archived notes</h2>

    <div class="flex flex-col gap-2">
      {#each notes.filter(note => note.archived) as note (note.id)}
        <div
          class="flex flex-col p-4 gap-2 rounded transition-all border border-gray ring-2 bg-black relative group {noteBorderColors.find(el => el.name === note.color)?.class ?? 'ring-0'}"
        >
          <div class="opacity-50">
            <h2>{note.title}</h2>
            {#if note.type === 'list'}
              <ul>
                {#each note.items.slice(0, 4) as item}
                  <li class="line-clamp-1 flex flex-row items-center gap-2">
                    <Checkbox checked={item.checked} class="w-4 h-4" />
                    <p class="text-sm">{item.content}</p>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="line-clamp-5 text-sm">{note.content}</p>
            {/if}
          </div>
          <button class="w-full flex flex-row items-center gap-2 mt-4" onclick={() => {note.archived = false; saveNote(note)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Restore
          </button>
        </div>
      {/each}
    </div>
  </Modal>
{/if}

<!-- New note modal -->
<Modal bind:open={newNoteModalOpen} title="New note">
  <form method="POST" action="?/createTextualNote">
    <button type="submit" class="w-full p-2 hover:bg-black transition-all rounded">Text note</button>
  </form>
  <form method="POST" action="?/createListNote">
    <button class="w-full px-2 py-2 hover:bg-black transition-all rounded">List</button>
  </form>
</Modal>
