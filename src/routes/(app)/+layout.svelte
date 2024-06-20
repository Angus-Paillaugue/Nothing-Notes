<script>
	import { Icon } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { isOffline } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import { accordion } from '$lib/utils';

	let isOfflineDetailsShown = $state(false);
</script>

{#if $isOffline}
	<button
		class="fixed top-2 left-1/2 -translate-x-1/2 transition-all w-[90%] max-w-[500px] z-[60] bg-gray min-h-[3.5rem] rounded-[2rem] p-2 button"
		in:fly={{ y: '-100%' }}
		out:fly={{ y: '-100%' }}
		onclick={() => (isOfflineDetailsShown = !isOfflineDetailsShown)}
	>
		<div class="flex flex-row gap-2 my-1 items-center px-4 h-[3rem]">
			<Icon name="no-internet" />
			{$_('noInternet.title')}
			<Icon
				name="caret-down"
				class="size-4 transition-all ml-auto {isOfflineDetailsShown && 'rotate-180'}"
			/>
		</div>
		<p use:accordion={isOfflineDetailsShown}>
			{$_('noInternet.description')}
		</p>
	</button>
{/if}

<svelte:head>
	<meta name="robots" content="none" />
	<meta name="googlebot" content="none" />
	<meta name="googlebot-news" content="none" />
</svelte:head>

<div class="max-w-screen-lg mx-auto relative min-h-screen flex flex-col">
	<slot />
</div>
