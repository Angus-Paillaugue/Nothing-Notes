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
		'bg-black px-2 py-1 text-base tracking-tight grow rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot resize-none',
		className
	)}
	placeholder={$_(placeholder)}
	style="border: 1px dashed white;"
	rows="1"
	{...restProps}
	oninput={(e) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight + 2}px`;
	}}
></textarea>
