<script>
	import { fly } from 'svelte/transition';
  import { formatDate } from '$lib/utils';
  import { Checkbox } from '$lib/components';
  // import { longPress } from './longPress';

  const { data } = $props();
  let notes = $state(data.notes);
  let newNoteDropdown = $state(false);

  const onClick = (e) => {
    if (!e.target.closest('#new-note')) newNoteDropdown = false;
  }
</script>

<svelte:window onclick={onClick} />

<div class="grid gap-4 w-full p-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
  {#each notes.filter(el => !el.checked) as note (note.id)}
    <a
      href="/note/{note.id}"
      class="flex flex-col p-4 gap-2 rounded transition-all border bg-black border-gray relative group"
    >
      <div class="absolute top-1 right-1 bg-gray border border-gray rounded-full p-1 text-xs group-hover:opacity-0 transition-all">
        {formatDate(note.lastModified, 'short')}
      </div>
      <h2>{note.title}</h2>
      {#if note.type === 'list'}
        <ul>
          {#each note.items.slice(0, 4) as item}
            <li class="line-clamp-1 flex flex-row items-center gap-2"><Checkbox checked={item.checked} />{item.content}</li>
          {/each}
        </ul>
      {:else}
        <p class="line-clamp-5 text-sm whitespace-pre">{note.content}</p>
      {/if}
    </a>
  {/each}
</div>

<div id='new-note' class="fixed bottom-4 left-1/2 -translate-x-1/2">
  <div class="relative">
    {#if newNoteDropdown}
      <div class="absolute left-1/2 -translate-x-1/2 bottom-full rounded flex flex-col gap-2 w-[200px] mb-2 bg-gray ring-4 ring-gray" in:fly out:fly>
        <form method="POST" action="?/createTextualNote">
          <button type="submit" class="w-full px-2 py-2 hover:bg-black transition-all rounded">Text note</button>
        </form>
        <form method="POST" action="?/createListNote">
          <button class="w-full px-2 py-2 hover:bg-black transition-all rounded">List</button>
        </form>
      </div>
    {/if}
  </div>
  <button onclick={() => {newNoteDropdown = !newNoteDropdown}} class="rounded-full bg-red p-4 flex flex-col items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>
