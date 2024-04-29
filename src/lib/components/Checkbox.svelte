<script>
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let { checked = $bindable(false), change } = $props();

</script>

<div class="relative w-6 h-6 flex flex-col items-center justify-center">
  <input type="checkbox" class="appearance-none w-full h-full rounded-md border-2 bg-black border-white checked:border-gray peer checked:bg-black transition-all" bind:checked={checked} onchange={() => {dispatch('change', { checked });}} />
  {#if checked}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="absolute w-4 h-4 pointer-events-none {checked ? 'text-white' : 'text-gray'}" in:scale out:scale>
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  {/if}
</div>
