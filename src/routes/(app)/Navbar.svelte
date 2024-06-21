<script>
	import { Icon } from '$lib/components';

	const { text, back = false, account = false } = $props();
</script>

<nav class="mb-6 flex h-14 flex-row items-center justify-between gap-2 bg-white dark:bg-black">
	<!-- Go back button -->
	{#if back}
		<button onclick={() => window.history.back()} class="p-2">
			<Icon name="back" />
		</button>
	{:else}
		<span class="size-10"></span>
	{/if}

	<h1>{text}</h1>

	{#if account}
		<a class="p-2" href="/account">
			<Icon name="account" />
		</a>
	{:else}
		<span class="size-10"></span>
	{/if}
</nav>
