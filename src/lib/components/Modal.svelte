<script>
	import { fade, fly } from 'svelte/transition';
	import { Drawer } from 'vaul-svelte';

	let { open = $bindable(), children, title } = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 bg-gray/80" />
		<Drawer.Content
			class="fixed bottom-0 left-0 right-0 flex max-h-[60%] flex-col bg-black rounded-t-[10px] p-4"
		>
      <!-- IOS like bar -->
      <div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray"></div>
      <div class="mx-auto max-w-md w-full">
        {#if title}
          <h2 class="mb-4">{title}</h2>
        {/if}
        {@render children()}
      </div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
