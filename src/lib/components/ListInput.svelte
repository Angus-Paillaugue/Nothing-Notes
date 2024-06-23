<script>
	import { twMerge } from 'tailwind-merge';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let { value = $bindable(), class: className, placeholder, ...restProps } = $props();
	let textarea = $state();
	onMount(() => {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight + 2}px`;
	});
</script>

<textarea
	bind:value
	bind:this={textarea}
	class={twMerge(
		'grow resize-none rounded border border-dashed border-black bg-white px-2 py-1 font-base text-base tracking-tight placeholder:text-gray placeholder-shown:font-dot focus:outline-none dark:border-white dark:bg-black dark:placeholder:text-white',
		className
	)}
	placeholder={$_(placeholder)}
	rows="1"
	{...restProps}
	oninput={(e) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight + 2}px`;
	}}
></textarea>
