<script>
	const { children } = $props();
</script>

<div class="flex flex-row items-center my-4">
	<span class="w-full border-b border-gray"></span>
	{#if children}
		<div class="mx-4 flex flex-row gap-2 items-center">
			{@render children()}
		</div>
	{/if}
	<span class="w-full border-b border-gray"></span>
</div>
