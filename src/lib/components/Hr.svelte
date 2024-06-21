<script>
	import { twMerge } from 'tailwind-merge';

	const { children, text, class: className, ...restProps } = $props();

	const spanClasses = twMerge('w-full border-b border-gray-light dark:border-gray', className);
</script>

<div class="my-4 flex flex-row items-center" {restProps}>
	<span class={spanClasses}></span>
	{#if text || children}
		<div class="mx-4 flex shrink-0 flex-row items-center gap-2">
			{text}
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
	<span class={spanClasses}></span>
</div>
