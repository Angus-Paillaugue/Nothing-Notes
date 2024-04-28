<script>
  const { data } = $props()
  let notes = $state(data.notes);

  const generateUUID = () => crypto.randomUUID();
</script>

<div class="grid gap-4 w-full p-2" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
  {#each notes as note (note.id)}
    <a href="/note/{note.id}" oncontextmenu={() => {console.log('test')}} class="flex flex-col p-4 border border-gray gap-2 rounded transition-all hover:bg-gray">
      <h2>{note.title}</h2>
      <p class="line-clamp-5 text-sm whitespace-pre">{note.content}</p>
    </a>
  {/each}
</div>

<div class="fixed bottom-4 left-1/2 -translate-x-1/2">
  <a href="/note/{generateUUID()}" class="rounded-full bg-red p-4 flex flex-col items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </a>
</div>
