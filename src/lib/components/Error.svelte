<script>
	import { _ } from 'svelte-i18n';
	import { Icon } from '$lib/components';
	import { twMerge } from 'tailwind-merge';

	const { message, children, class: className, success = false, ...restProps } = $props();
</script>

<div
	class={twMerge('p-6 rounded-full bg-black flex flex-row gap-4 items-center', className)}
	{...restProps}
>
	<div
		class="rounded-full size-12 {success
			? 'bg-green-800'
			: 'bg-red'} flex flex-col items-center justify-center shrink-0"
	>
		<Icon name={success ? 'check' : 'warning'} />
	</div>
	<p>
		{#if message}
			{$_(message)}
		{/if}
		{@render children()}
	</p>
</div>
