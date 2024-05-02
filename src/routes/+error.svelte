<script>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { Button } from '$lib/components';
</script>

<svelte:head>
	<title>{$page.status} : {$page.error.message}</title>
</svelte:head>

<section class="h-screen flex flex-col items-center justify-center gap-4">
	<span class="text-8xl font-dot">{$page.status}</span>
	<span class="text-lg">{$_(`error.messages.${$page.error.message}`)}</span>
	<Button href="/">{$_('error.goBack')}</Button>
</section>
