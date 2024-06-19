<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { seo, isOffline } from '$lib/stores';
	import { CookieModal, Analytics } from '$lib/components';

	onMount(() => {
		console.log(
			'%c \uD83E\uDD19 Developed by Angus Paillaugue',
			'font-size: 12px;font-family: monospace;background: #000000;color: #FFFFFF;padding: 15px;border: 2px solid #1b1d1f; border-radius: 12px;'
		);

		// Set the document direction (ltr ot rtl) based on the `dir` value in the locale dictionary
		document.documentElement.setAttribute('dir', $_('dir') === 'dir' ? 'ltr' : $_('dir'));
		$isOffline = navigator.onLine === false;
		window.addEventListener('offline', () => {
			$isOffline = true;
		});

		window.addEventListener('online', () => {
			$isOffline = false;
		});
	});
</script>

<Analytics />
<CookieModal />

<svelte:head>
	<link rel="canonical" href={$page.url.href.split('#')[0]} />
	<meta property="twitter:domain" content={$page.url.hostname} />
	<meta property="twitter:url" content={$page.url.href.split('#')[0]} />

	<meta property="og:url" content={$page.url.href.split('#')[0]} />
	<meta property="og:locale" content={$locale} />
	<meta property="og:site_name" content="Nothing Notes" />

	<title>{$_($seo.title)} - Notes</title>
	<meta property="og:title" content={$_($seo.title) + ' - Notes'} />
	<meta property="twitter:title" content={$_($seo.title) + ' - Notes'} />

	<meta name="description" content={$_($seo.description)} />
	<meta property="og:description" content={$_($seo.description)} />
	<meta property="twitter:description" content={$_($seo.description)} />
</svelte:head>

<slot />
