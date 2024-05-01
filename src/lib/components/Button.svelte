<script>
	import { twMerge } from 'tailwind-merge';

	const { children, class: className, href, center, ...restProps } = $props();

	const baseClasses = `py-2 px-3 bg-gray transition-all rounded flex flex-row items-center gap-2 text-center button ${center && 'justify-center'}`;
</script>

{#if href}
	<a class={twMerge(baseClasses, className)} {href} {...restProps}>
		{@render children()}
	</a>
{:else}
	<button class={twMerge(baseClasses, className)} {...restProps}>
		{@render children()}
	</button>
{/if}
