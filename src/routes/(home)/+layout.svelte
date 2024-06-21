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
	class="flex h-12 w-full flex-row items-center justify-between rounded-t border border-b-0 border-dashed border-black p-2 dark:border-white"
>
	<p class="text-sm">{$_('footer.text', { values: { date: new Date().getFullYear() } })}</p>
	<a href="/privacy-policy" class="text-sm">{$_('footer.privacyPolicy')}</a>
</footer>
