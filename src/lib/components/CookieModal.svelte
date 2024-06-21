<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade, fly } from 'svelte/transition';
	import { Button, Icon } from '$lib/components';
	import { accordion } from '$lib/utils';

	let show = $state(false);
	let learnMoreOpen = $state(false);

	onMount(() => {
		show = localStorage.getItem('cookie-consent') === null;
	});

	const buttonClick = () => {
		localStorage.setItem('cookie-consent', true);
		show = false;
	};
</script>

{#if show}
	<!-- Backdrop -->
	<div class="fixed inset-0 z-50 bg-gray/70" in:fade out:fade></div>
	<div
		class="fixed bottom-2 left-2 z-50 flex flex-col rounded bg-white p-4 dark:bg-black max-sm:right-2 sm:w-full md:max-w-[500px]"
		in:fly={{ y: '100%' }}
		out:fly={{ y: '100%' }}
	>
		<h1>{$_('cookieModal.title')}</h1>
		<p class="mt-2">{$_('cookieModal.description')}</p>
		<p use:accordion={learnMoreOpen} class:mt-2={learnMoreOpen}>{$_('cookieModal.moreInfo')}</p>
		<button
			class="button mb-4 mt-2 flex w-fit flex-row items-center gap-2 px-2"
			onclick={() => (learnMoreOpen = !learnMoreOpen)}
		>
			{#if learnMoreOpen}
				{$_('cookieModal.learnLess')}
			{:else}
				{$_('cookieModal.learnMore')}
			{/if}
			<Icon
				name="caret-down"
				class="size-4 transform transition-transform {learnMoreOpen && 'rotate-180'}"
			/>
		</button>
		<Button onclick={buttonClick} center>{$_('cookieModal.accept')}</Button>
	</div>
{/if}
