<script>
	import { fade, fly } from 'svelte/transition';
	import { Icon } from '$lib/components';

	let { open = $bindable(), children, title } = $props();
</script>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 bg-gray/70 z-50" in:fade out:fade onclick={() => (open = false)}></div>
	<div
		class="fixed bottom-0 md:bottom-1/2 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 max-w-screen-md w-full left-0 flex flex-col gap-2 z-50 rounded bg-black"
		in:fly={{ y: '100%' }}
		out:fly={{ y: '100%' }}
	>
		<div class="flex flex-row items-center justify-between p-4">
			{#if title}
				<h2>{title}</h2>
			{/if}

			<button onclick={() => (open = false)} class={title ? '' : 'ml-auto'}>
				<Icon name="close" />
			</button>
		</div>
		<div class="w-full max-h-[70vh] overflow-auto p-6 pt-0">
			{@render children()}
		</div>
	</div>
{/if}
