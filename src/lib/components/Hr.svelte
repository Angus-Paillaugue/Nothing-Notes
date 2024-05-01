<script>
	const { children, text } = $props();
</script>

<div class="flex flex-row items-center my-4">
	<span class="w-full border-b border-gray"></span>
	<div class="mx-4 flex flex-row gap-2 items-center">
		{text}
		{@render children()}
	</div>
	<span class="w-full border-b border-gray"></span>
</div>
