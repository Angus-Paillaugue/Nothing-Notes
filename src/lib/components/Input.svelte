<script>
	import { twMerge } from 'tailwind-merge';

	let { value = $bindable(), type = 'text', class: className, ...restProps } = $props();
</script>

<input
	{type}
	class={twMerge(
		'bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot',
		className
	)}
	style="border: 1px dashed white;"
	bind:value
	{...restProps}
/>
