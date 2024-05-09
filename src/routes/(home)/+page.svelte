<script>
	import { Button, Icon, Modal } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';

	let getStartedModalOpen = $state(false);
	$seo.title = 'pageTitles.home';
	$seo.description = 'pageDescriptions.home';
</script>

<section class="h-screen w-full flex flex-col items-center justify-center gap-4 px-2">
	<h1 class="text-4xl">Nothing Notes</h1>
	<p class="text-center">{$_('homePage.hero.subtitle')}</p>

	<Button
		onclick={() => {
			getStartedModalOpen = true;
		}}>{$_('homePage.hero.cta.title')}</Button
	>
</section>

<section class="flex flex-col items-center justify-center py-14 px-2">
	<div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-3 w-full gap-8">
		<div class="flex flex-col gap-2 items-center text-center">
			<Icon name="pen" class="size-14" />
			<h2>{$_('homePage.features.items.0.title')}</h2>
			<p>{$_('homePage.features.items.0.description')}</p>
		</div>
		<div class="flex flex-col gap-2 items-center text-center">
			<Icon name="pin" class="size-14" />
			<h2>{$_('homePage.features.items.1.title')}</h2>
			<p>{$_('homePage.features.items.1.description')}</p>
		</div>
		<div class="flex flex-col gap-2 items-center text-center">
			<Icon name="cloud" class="size-14" />
			<h2>{$_('homePage.features.items.2.title')}</h2>
			<p>{$_('homePage.features.items.2.description')}</p>
		</div>
	</div>
</section>

<Modal bind:open={getStartedModalOpen} title={$_('homePage.hero.cta.title')}>
	<Button center href="/log-in">{$_('homePage.hero.cta.logIn')}</Button>
	<Button center href="/sign-up" class="mt-2">{$_('homePage.hero.cta.signUp')}</Button>
</Modal>
