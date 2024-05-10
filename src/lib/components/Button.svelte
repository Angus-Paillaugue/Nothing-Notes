<script>
	import { twMerge } from 'tailwind-merge';
	import { Loader } from '$lib/components';

	const { children, class: className, href, center, loading, ...restProps } = $props();

	const baseClasses = `py-2 px-3 bg-gray transition-all rounded flex flex-row items-center gap-2 text-center button ${center && 'justify-center'}`;
</script>

{#if href}
	<a class={twMerge(baseClasses, className)} {href} {...restProps}>
		{#if loading}
			<Loader />
		{:else}
			{@render children()}
		{/if}
	</a>
{:else}
	<button class={twMerge(baseClasses, className)} {...restProps}>
		{#if loading}
			<Loader />
		{:else}
			{@render children()}
		{/if}
	</button>
{/if}
