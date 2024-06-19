<script>
	import { twMerge } from 'tailwind-merge';

	const { children, text, class: className, ...restProps } = $props();

	const spanClasses = twMerge('w-full border-b border-gray', className);
</script>

<div class="flex flex-row items-center my-4" {restProps}>
	<span class={spanClasses}></span>
	{#if text || children}
		<div class="mx-4 flex flex-row gap-2 items-center shrink-0">
			{text}
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
	<span class={spanClasses}></span>
</div>
