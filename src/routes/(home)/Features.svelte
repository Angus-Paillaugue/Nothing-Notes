<script>
	import { Icon } from '$lib/components';
	import { _ } from 'svelte-i18n';

	let { getStartedModalOpen = $bindable() } = $props();

	const features = [
		{
			title: $_('homePage.features.items.0.title'),
			description: $_('homePage.features.items.0.description'),
			icon: 'pen',
			image: '/homePage/createNotes.png'
		},
		{
			title: $_('homePage.features.items.1.title'),
			description: $_('homePage.features.items.1.description'),
			icon: 'pin',
			image: '/homePage/sortNotes.png'
		},
		{
			title: $_('homePage.features.items.2.title'),
			description: $_('homePage.features.items.2.description'),
			icon: 'cloud',
			image: '/homePage/sync.png'
		},
		{
			title: $_('homePage.features.items.3.title'),
			description: $_('homePage.features.items.3.description'),
			icon: 'search',
			image: '/homePage/search.png'
		}
	];
</script>

<section class="w-full py-12 md:py-24 lg:py-32">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col items-center justify-center space-y-4 text-center">
			<div class="space-y-2">
				<div
					class="mb-4 inline-block rounded-full border border-red bg-red/40 px-3 py-1 text-center text-sm font-bold italic text-black dark:bg-red/20 dark:text-white"
				>
					{$_('homePage.features.pillButton')}
				</div>
				<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
					{$_('homepage.hero.features.title')}
				</h2>
				<p class="text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					{$_('homepage.hero.features.description')}
				</p>
			</div>
		</div>
		<div class="flex flex-col items-center gap-10 lg:flex-row">
			<div class="mx-auto grid items-center gap-6 pt-6 lg:grid-cols-2 lg:gap-12 lg:py-12">
				<!-- All features -->
				{#each features as feature}
					<div
						class="relative flex h-full w-full cursor-default flex-col gap-4 overflow-hidden rounded-[2.5rem] border border-neutral-400 border-opacity-50 bg-gray-light p-4 transition-all hover:border-opacity-100 dark:border-neutral-700 dark:bg-gray md:p-8"
					>
						<div
							class="pointer-events-none absolute inset-0 opacity-15"
							style="background: #000000 url(/homePage/noise.webp) repeat; background-size: 150px, 100%; background-blend-mode: screen;"
						></div>
						<div class="flex flex-row items-center gap-2">
							<Icon name={feature.icon} class="size-6 text-red" />
							<h3 class="text-xl font-bold">{feature.title}</h3>
						</div>
						<p class="text-gray dark:text-gray-light">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
			<button
				onclick={() => (getStartedModalOpen = true)}
				class="relative size-48 shrink-0 overflow-hidden rounded-[2.5rem] bg-gray-light transition-all duration-1000 ease-in-out hover:scale-110 dark:bg-gray lg:size-64"
			>
				<div
					class="pointer-events-none absolute inset-0 opacity-15"
					style="background: #000000 url(/homePage/noise.webp) repeat; background-size: 150px, 100%; background-blend-mode: screen;"
				></div>
				<img
					src="/logos/logo_transparent.webp"
					class="h-full w-full cursor-pointer object-contain object-center transition-all duration-1000 ease-in-out hover:drop-shadow-[0_0_10px_rgba(0,0,0,.7)] dark:hover:drop-shadow-[0_0_10px_rgba(255,255,255,.7)]"
					alt=""
				/>
			</button>
		</div>
	</div>
</section>
