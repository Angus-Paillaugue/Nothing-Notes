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
	<div class="inset-0 fixed bg-gray/70 z-50" in:fade out:fade></div>
	<div
		class="fixed bottom-2 left-2 md:max-w-[500px] sm:w-full max-sm:right-2 flex flex-col z-50 p-4 rounded bg-black"
		in:fly={{ y: '100%' }}
		out:fly={{ y: '100%' }}
	>
		<h1>{$_('cookieModal.title')}</h1>
		<p class="mt-2">{$_('cookieModal.description')}</p>
		<p use:accordion={learnMoreOpen} class:mt-2={learnMoreOpen}>{$_('cookieModal.moreInfo')}</p>
		<button
			class="w-fit px-2 mb-4 mt-2 flex flex-row gap-2 items-center button"
			onclick={() => (learnMoreOpen = !learnMoreOpen)}
		>
			{#if learnMoreOpen}
				{$_('cookieModal.learnLess')}
			{:else}
				{$_('cookieModal.learnMore')}
			{/if}
			<Icon
				name="caret-down"
				class="transform transition-transform size-4 {learnMoreOpen && 'rotate-180'}"
			/>
		</button>
		<Button onclick={buttonClick} center>{$_('cookieModal.accept')}</Button>
	</div>
{/if}
