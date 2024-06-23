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
		class="button fixed left-1/2 top-2 z-[60] min-h-[3.5rem] w-[90%] max-w-[500px] -translate-x-1/2 rounded-[2rem] bg-gray-light p-2 transition-all dark:bg-gray"
		in:fly={{ y: '-100%' }}
		out:fly={{ y: '-100%' }}
		onclick={() => (isOfflineDetailsShown = !isOfflineDetailsShown)}
	>
		<div class="my-1 flex h-[3rem] flex-row items-center gap-2 px-4">
			<Icon name="no-internet" />
			{$_('noInternet.title')}
			<Icon
				name="caret-down"
				class="ml-auto size-4 transition-all {isOfflineDetailsShown && 'rotate-180'}"
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

<div class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col">
	<slot />
</div>
