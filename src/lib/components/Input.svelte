<script>
	import { twMerge } from 'tailwind-merge';

	let { value = $bindable(), type = 'text', label, class: className, ...restProps } = $props();
</script>

{#snippet input()}
	<input
		{type}
		class={twMerge(
			'bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot',
			className
		)}
		style="border: 1px dashed white;"
		bind:value
		{...restProps}
	/>
{/snippet}


{#if label}
	<span class="flex flex-col justify-center">
		<span class="text-base font-semibold">{label}</span>
		{@render input()}
	</span>
{:else}
	{@render input()}
{/if}
