<script>
	import { twMerge } from 'tailwind-merge';
	import { Icon, tooltip } from '$lib/components';

	let { value = $bindable(), type = 'text', label, labelIcon, labelIconTooltip, class: className, ...restProps } = $props();
</script>


{#snippet input()}
	<input
		{type}
		class={twMerge(
			'w-full rounded border border-dashed border-black bg-white px-2 py-1 font-base text-sm tracking-tight placeholder:text-gray placeholder-shown:font-dot focus:outline-none dark:border-white dark:bg-black dark:placeholder:text-white',
			className
		)}
		bind:value
		{...restProps}
	/>
{/snippet}

{#if label}
	<span class="flex flex-col justify-center">
		<span class="text-base font-semibold flex flex-row items-center gap-4">
			{label}
			{#if labelIcon}
				{#if labelIconTooltip}
					<span use:tooltip={{ content: labelIconTooltip }}>
						<Icon name={labelIcon} class="size-4" />
					</span>
				{:else}
					<Icon name={labelIcon} class="size-4" />
				{/if}
			{/if}
		</span>
		{@render input()}
	</span>
{:else}
	{@render input()}
{/if}
