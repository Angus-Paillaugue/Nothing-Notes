<script>
	import { fade, fly } from "svelte/transition";

  let { open = $bindable(), children } = $props();
</script>


{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-black/40 z-[49]" onclick={() => {open = false;}} transition:fade></div>
  <div class="fixed bottom-0 left-0 right-0 rounded-t-xl bg-gray p-4 max-h-[60vh] overflow-y-auto z-50" transition:fly={{ y:'100%' }}>
    {@render children()}
  </div>
{/if}
