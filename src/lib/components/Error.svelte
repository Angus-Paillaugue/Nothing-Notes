<script>
	import { _ } from 'svelte-i18n';
	import { Icon } from '$lib/components';
	import { twMerge } from 'tailwind-merge';

	const { message, children, class: className, ...restProps } = $props();
</script>

<div
	class={twMerge('p-6 rounded-full bg-black flex flex-row gap-4 items-center', className)}
	{...restProps}
>
	<div class="rounded-full size-16 bg-red flex flex-col items-center justify-center shrink-0">
		<Icon name="warning" />
	</div>
	<p>
		{#if message}
			{$_(message)}
		{/if}
		{@render children()}
	</p>
</div>
