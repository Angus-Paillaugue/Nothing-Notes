<script>
	import { fade, fly } from 'svelte/transition';
	import { Icon } from '$lib/components';

	let { open = $bindable(), children, title } = $props();
</script>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-50 bg-gray/50 dark:bg-gray/70 transition-all backdrop-blur-[2px]" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }} onclick={() => (open = false)}></div>
	<div
		class="fixed bottom-0 left-0 z-50 flex w-full max-w-screen-md flex-col gap-2 rounded-t-xl md:rounded-b-xl bg-white dark:bg-black md:bottom-1/2 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2"
		in:fly={{ y: '100%', duration: 150 }}
		out:fly={{ y: '100%', duration: 150 }}
	>
		<div class="flex flex-row items-center justify-between p-4">
			{#if title}
				<h2>{title}</h2>
			{/if}

			<button onclick={() => (open = false)} class={title ? '' : 'ml-auto'}>
				<Icon name="close" />
			</button>
		</div>
		<div class="max-h-[70vh] w-full overflow-auto p-6 pt-0">
			{@render children()}
		</div>
	</div>
{/if}
