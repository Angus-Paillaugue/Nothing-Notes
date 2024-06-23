<script>
	import { mode, toggleMode } from 'mode-watcher';
	import { Button, Icon } from '$lib/components';
	import { scale } from 'svelte/transition';
</script>

<div class="h-14"></div>
<nav
	class="fixed left-0 right-0 top-0 z-40 h-14 border-b border-gray-light bg-white dark:border-0 dark:bg-black"
>
	<div
		class="mx-auto flex max-w-screen-xl flex-row items-center justify-between px-2 py-2 text-center"
	>
		<span class="size-8 md:size-10"></span>
		<a href="/">
			<h1>Nothing Notes</h1>
		</a>

		<!-- Theme switcher -->
		<Button
			class="flex size-8 flex-col items-center justify-center p-2 md:size-10"
			onclick={toggleMode}
		>
			{#if $mode === 'dark'}
				<div in:scale={{ duration: 200 }}>
					<Icon name="moon" class="size-4 text-black dark:text-white md:size-6" />
				</div>
			{:else}
				<div in:scale={{ duration: 200 }}>
					<Icon name="sun" class="size-4 text-black dark:text-white md:size-6" />
				</div>
			{/if}
		</Button>
	</div>
</nav>
