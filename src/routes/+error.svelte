<script>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { Button } from '$lib/components';
	import { seo } from '$lib/stores';

	$seo.title = $page.status + ' : ' + $page.error.message;
	$seo.description = 'pageDescriptions.error';
</script>

<section class="flex h-screen flex-col items-center justify-center gap-4">
	<span class="font-dot text-8xl">{$page.status}</span>
	<span class="text-lg">{$_($page.error.message)}</span>
	<Button href="/">{$_('error.goBack')}</Button>
</section>
