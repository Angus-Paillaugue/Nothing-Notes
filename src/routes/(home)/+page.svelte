<script>
  import Features from './Features.svelte';
  import Hero from './Hero.svelte';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';
	import { Button, Modal } from '$lib/components';

	$seo.title = 'pageTitles.home';
	$seo.description = 'pageDescriptions.home';

	let getStartedModalOpen = $state(false);
</script>

<Hero bind:getStartedModalOpen={getStartedModalOpen} />

<Features bind:getStartedModalOpen={getStartedModalOpen} />


<Modal bind:open={getStartedModalOpen} title={$_('homePage.hero.cta.title')}>
	<Button center href="/log-in">{$_('homePage.hero.cta.logIn')}</Button>
	<Button center href="/sign-up" class="mt-2">{$_('homePage.hero.cta.signUp')}</Button>
</Modal>
