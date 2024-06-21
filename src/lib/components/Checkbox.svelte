<script>
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { Icon } from '$lib/components';

	const dispatch = createEventDispatcher();
	let { checked = $bindable(false), class: className } = $props();
</script>

<div class={twMerge('relative flex size-6 flex-col items-center justify-center ', className)}>
	<input
		type="checkbox"
		class="peer h-full w-full appearance-none rounded-md transition-all border-2 bg-white dark:bg-black border-black dark:border-white"
		bind:checked
		onchange={() => {
			dispatch('change', { checked });
		}}
	/>
	{#if checked}
		<div
			class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-[2px]"
			in:scale
			out:scale
		>
			<Icon
				name="check"
				stroke-width={2}
				class="size-4 {checked ? 'text-gray dark:text-white' : 'text-white dark:text-gray'}"
			/>
		</div>
	{/if}
</div>
