<script>
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { Icon } from '$lib/components';

	const dispatch = createEventDispatcher();
	let { checked = $bindable(false), class: className } = $props();
</script>

<div class={twMerge('relative size-6 flex flex-col items-center justify-center ', className)}>
	<input
		type="checkbox"
		class="appearance-none w-full h-full rounded-md border-2 bg-black border-white checked:border-gray peer checked:bg-black transition-all"
		bind:checked
		onchange={() => {
			dispatch('change', { checked });
		}}
	/>
	{#if checked}
		<div
			class="absolute pointer-events-none flex flex-col items-center justify-center inset-0"
			in:scale
			out:scale
		>
			<Icon name="check" class="size-4 {checked ? 'text-white' : 'text-gray'}" />
		</div>
	{/if}
</div>
