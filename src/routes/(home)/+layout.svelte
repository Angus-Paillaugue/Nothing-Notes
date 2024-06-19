<script>
	import { Navbar } from '$lib/components';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<meta name="robots" content="all" />
	<meta name="googlebot" content="all" />
	<meta name="googlebot-news" content="all" />
</svelte:head>

<Navbar />

<slot />

<div class="grow"></div>

<footer
	class="w-full p-2 flex flex-row items-center justify-between rounded-t h-12"
	style="border: 1px dashed white;border-bottom: 0;"
>
	<p class="text-sm">{$_('footer.text', { values: { date: new Date().getFullYear() } })}</p>
	<a href="/privacy-policy" class="text-sm">{$_('footer.privacyPolicy')}</a>
</footer>
