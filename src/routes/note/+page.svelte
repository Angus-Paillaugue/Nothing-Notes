<script>
  import { Modal, Hr, NoteCard, Loader, Button, Icon } from '$lib/components';
  import { noteBorderColors } from '$lib/constants';
  import { _ } from 'svelte-i18n';
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
  <title>{$_("notes.title")}</title>
</svelte:head>

{#if notes.length === 0}
  <h2>{$_("notes.noNotes")}</h2>
{/if}

{#if notes.filter(el => el.pinned && !el.archived).length > 0}
  <Hr>
    <Icon name="pin" class="size-4" />
    {$_("notes.pinned")}
  </Hr>
  <div class="grid gap-4 w-full px-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
    {#each notes.filter(el => el.pinned && !el.archived) as note (note.id)}
      <NoteCard {note} />
    {/each}
  </div>

  <Hr />
{/if}

<div class="grid gap-4 w-full px-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
  {#each notes.filter(el => !el.archived && !el.pinned) as note (note.id)}
    <NoteCard {note} />
  {/each}
</div>

<div class="fixed bottom-4 left-1/2 -translate-x-1/2">
  <button onclick={() => {newNoteModalOpen = true;}} class="rounded-full bg-red p-4 flex flex-col items-center justify-center">
    <Icon name="plus" class="size-10" />
  </button>
</div>

{#if notes.filter(note => note.archived).length > 0}
  <button class="fixed bottom-4 right-4 rounded-full bg-gray p-2" onclick={() => {archivedNotesModalOpen = true;}}>
    <Icon name="archive" />
  </button>

  <!-- Archived notes modal -->
  <Modal bind:open={archivedNotesModalOpen} title={$_("notes.modals.archivedNotes.title")}>
    <div class="flex flex-col gap-6">
      {#each notes.filter(note => note.archived) as note (note.id)}
        <div class="flex flex-col">
          <NoteCard {note} inactive={true} class='rounded-b-none' />
          <button class="rounded-b ring-2 flex flex-row gap-2 px-4 py-2 bg-black -mt-[2x] {noteBorderColors.find(el => el.name === note.color)?.class ?? 'ring-0'}" onclick={() => (unArchiveNote(note))} disabled={unArchivingNote === note.id}>
            {#if unArchivingNote === note.id}
              <Loader />
            {:else}
              <Icon name="back" class="size-5" />
            {/if}
            {$_("notes.modals.archivedNotes.restore")}
          </button>
        </div>
      {/each}
    </div>
  </Modal>
{/if}

<!-- New note modal -->
<Modal bind:open={newNoteModalOpen} title={$_("notes.modals.newNote.title")}>
  <div class="flex flex-col gap-2">
    <form method="POST" action="?/createTextualNote">
      <Button type="submit" class="w-full">
        <Icon name="paragraph" />
        {$_("notes.modals.newNote.noteTypes.text")}
      </Button>
    </form>
    <form method="POST" action="?/createListNote">
      <Button type="submit" class="w-full">
        <Icon name="list" />
        {$_("notes.modals.newNote.noteTypes.list")}
      </Button>
    </form>
  </div>
</Modal>
