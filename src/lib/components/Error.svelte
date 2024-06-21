<script>
	import { _ } from 'svelte-i18n';
	import { Icon } from '$lib/components';
	import { twMerge } from 'tailwind-merge';

	const { message, children, class: className, success = false, ...restProps } = $props();
</script>

<div
	class={twMerge(
		'flex flex-row items-center gap-4 rounded-full bg-white p-6 dark:bg-black',
		className
	)}
	{...restProps}
>
	<div
		class="size-12 rounded-full {success
			? 'bg-green-600 dark:bg-green-800'
			: 'bg-red-600 dark:bg-red'} flex shrink-0 flex-col items-center justify-center"
	>
		<Icon name={success ? 'check' : 'warning'} />
	</div>
	<p>
		{#if message}
			{$_(message)}
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</p>
</div>
