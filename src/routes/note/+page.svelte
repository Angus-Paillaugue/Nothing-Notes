<script>
  import { Modal, Hr, NoteCard, Loader } from '$lib/components';
  import { noteBorderColors } from '$lib/constants';
  // import { longPress } from './longPress';

  const { data } = $props();

  let notes = $state(data.notes);
  let newNoteModalOpen = $state(false);
  let archivedNotesModalOpen = $state(false);
  let unArchivingNote = $state(undefined);

  async function saveNote(note) {
    const res = await fetch(`/api/${note.type === 'text' ? 'saveTextNote' : 'saveListNote'}`, {
      method: 'POST',
      body: JSON.stringify(note)
    });

    if (!res.ok)
      console.log(res);
  }

  const unArchiveNote = async(note) => {
    unArchivingNote = note.id;
    note.archived = false;
    await saveNote(note);
    unArchivingNote = undefined;
  };
</script>

<svelte:head>
  <title>Nothing notes</title>
</svelte:head>

{#if notes.filter(el => el.pinned).length > 0}
  <Hr>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 16 16">
      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z"/>
    </svg>
    Pinned
  </Hr>
  <div class="px-2">
    {#each notes.filter(el => el.pinned) as note (note.id)}
      <NoteCard {note} />
    {/each}
  </div>

  <Hr />
{/if}

<div class="grid gap-4 w-full p-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
  {#each notes.filter(el => !el.archived && !el.pinned) as note (note.id)}
    <NoteCard {note} />
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

    <div class="flex flex-col gap-6">
      {#each notes.filter(note => note.archived) as note (note.id)}
        <div class="flex flex-col">
          <NoteCard {note} inactive={true} class='rounded-b-none' />
          <button class="rounded-b ring-2 flex flex-row gap-2 px-4 py-2 bg-black -mt-[2x] {noteBorderColors.find(el => el.name === note.color)?.class ?? 'ring-0'}" onclick={() => (unArchiveNote(note))} disabled={unArchivingNote === note.id}>
            {#if unArchivingNote === note.id}
              <Loader />
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            {/if}
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
