<script>
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '$lib/components';

	const { name, class: classList, removable = false, size = 'md', ...restProps } = $props();
	const dispatch = createEventDispatcher();

	const sizes = {
		sm: 'text-xs px-1 py-0.5',
		md: 'text-base px-2 py-1',
		lg: 'text-lg px-3 py-1.5'
	};
</script>

<div
	class={twMerge(
		'group flex flex-row items-center rounded-full border border-black bg-white text-center font-medium italic dark:border-white dark:bg-black',
		sizes[size],
		classList
	)}
	{...restProps}
>
	{name}
	{#if removable}
		<button
			class="invisible -ml-1 size-0 -rotate-180 rounded p-1 transition-all duration-300 ease-in-out hover:bg-gray-light group-hover:visible group-hover:ml-2 group-hover:size-6 group-hover:rotate-0 dark:hover:bg-gray"
			onclick={() => {
				dispatch('delete', { name });
			}}
		>
			<Icon name="close" class="h-full w-full cursor-pointer" />
		</button>
	{/if}
</div>
