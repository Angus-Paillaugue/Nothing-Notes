<script>
	import { Button, Icon, Modal } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';

	let getStartedModalOpen = $state(false);
	let keyFeaturesSelectedIndex = $state(0);

	$seo.title = 'pageTitles.home';
	$seo.description = 'pageDescriptions.home';

	const features = [
		{
			title: $_('homePage.features.items.0.title'),
			description: $_('homePage.features.items.0.description'),
			icon: 'pen',
			image: "/homePage/createNotes.png"
		},
		{
			title: $_('homePage.features.items.1.title'),
			description: $_('homePage.features.items.1.description'),
			icon: 'pin',
			image: "/homePage/sortNotes.png"
		},
		{
			title: $_('homePage.features.items.2.title'),
			description: $_('homePage.features.items.2.description'),
			icon: 'cloud',
			image: "/homePage/sync.png"
		},
		{
			title: $_('homePage.features.items.3.title'),
			description: $_('homePage.features.items.3.description'),
			icon: 'search',
			image: "/homePage/search.png"
		}
	]
</script>

<!-- <section class="h-screen w-full flex flex-col items-center justify-center gap-4 px-2">
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
</section> -->

<Modal bind:open={getStartedModalOpen} title={$_('homePage.hero.cta.title')}>
	<Button center href="/log-in">{$_('homePage.hero.cta.logIn')}</Button>
	<Button center href="/sign-up" class="mt-2">{$_('homePage.hero.cta.signUp')}</Button>
</Modal>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-screen flex flex-col justify-center">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col justify-center space-y-4">
			<div class="flex flex-row gap-4 overflow-x-auto">
				{#snippet pill(text, borderColor, bgColor)}
					<div class="rounded-full border text-center px-3 py-1 text-base font-bold italic text-black {borderColor} {bgColor}">
						#{text}
					</div>
				{/snippet}
				{@render pill('Notes', 'border-amber-300', 'bg-amber-100')}
				{@render pill('Nothing', 'border-amber-300', 'bg-amber-100')}
				{@render pill('Updated', 'border-amber-300', 'bg-amber-100')}
			</div>
			<h1 class="text-3xl sm:text-5xl xl:text-6xl/none">
				Nothing Notes
			</h1>
			<p class="text-gray-500 md:text-xl dark:text-gray-400">
				{$_('homePage.hero.subtitle')}
			</p>
			<div class="flex flex-col gap-2 min-[400px]:flex-row">
				<Button
					onclick={() => {
						getStartedModalOpen = true;
					}}
				>
					{$_('homePage.hero.cta.title')}
				</Button>
			</div>
		</div>
	</div>
</section>
<section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center justify-center space-y-4 text-center">
			<div class="space-y-2">
				<div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
				<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Note-Taking</h2>
				<p class="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
					Notepad offers a range of features to help you stay organized and focused, from quick note-taking to
					cross-device syncing.
				</p>
			</div>
		</div>
		<div class="mx-auto grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
			<img
				src={features[keyFeaturesSelectedIndex].image}
				alt="Image"
				class="mx-auto overflow-hidden max-h-[400px] rounded-xl object-contain object-center sm:w-full lg:order-last"
			/>
			<div class="flex flex-col justify-center space-y-4">
				<div class="grid gap-6">
					{#each features as feature, i}
						<button class="rounded-lg cursor-pointer p-4 transition-all text-start" class:bg-gray={keyFeaturesSelectedIndex === i} onclick={() => (keyFeaturesSelectedIndex = i)}>
							<div class="grid gap-1">
								<div class="flex flex-row items-center gap-2">
									<Icon name={feature.icon} class="size-6" />
									<h3 class="text-xl font-bold">{feature.title}</h3>
								</div>
								<p class="text-gray-500 dark:text-gray-400">
									{feature.description}
								</p>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
