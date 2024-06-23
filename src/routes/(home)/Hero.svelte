<script>
	import { Button } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';

	let { getStartedModalOpen = $bindable() } = $props();

	let loaded = $state(false);

	onMount(() => {
		loaded = true;
	});
</script>

<section class="relative flex min-h-screen w-full flex-col justify-center py-12 md:py-24 lg:py-32">
	<!-- Background gradient -->
	<div
		class="absolute inset-0 -z-10 dark:brightness-[30%]"
		style="background: url(/homePage/noise.webp), radial-gradient(circle farthest-corner at 0 0, #000 30%, #D71921 65%, #f0f2f2 80%, #249688 110%) no-repeat, radial-gradient(closest-side at 60% 50%, #f0f2f2 20%, #000 100%) no-repeat; mix-blend-mode: screen; background-size: 140px, 100%, cover; background-blend-mode: overlay;"
	></div>

	<div class="mx-auto max-w-screen-lg px-4 md:px-6">
		<div class="flex flex-col gap-10">
			<div class="flex flex-col justify-center space-y-4 max-lg:text-center">
				<h1 class="text-5xl sm:text-5xl xl:text-8xl">Nothing Notes</h1>
				<p class="text-2xl text-gray opacity-70 dark:text-white sm:text-3xl">
					{$_('homePage.hero.subtitle')}
				</p>
				<!-- CTA -->
				<div class="flex flex-row items-center justify-center gap-2 lg:justify-start">
					<Button
						onclick={() => {
							getStartedModalOpen = true;
						}}
						class="text-lg font-bold lg:px-8 lg:py-4"
					>
						{$_('homePage.hero.cta.title')}
					</Button>
				</div>
			</div>

			<!-- Mockups -->
			<div class="z-0 flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
				<!-- Laptop mockup -->
				<div
					class="relative aspect-video w-full max-w-[800px] rounded-[.7rem] border-[8px] border-gray-light bg-gray-light dark:border-slate-800 dark:bg-slate-800 max-lg:hidden"
				>
					<div class="relative overflow-hidden rounded-[.25rem] bg-gray-light dark:bg-slate-800">
						<div
							class="flex flex-row items-center justify-start gap-[.3rem] border-b border-gray-light bg-white px-2 py-[4px] dark:border-gray dark:bg-black"
						>
							<div class="size-3 rounded-full border border-[#d52735] bg-[#fd5754]"></div>
							<div class="size-3 rounded-full border border-[#13c11e] bg-[#34c848]"></div>
							<div class="size-3 rounded-full border border-[#da9e10] bg-[#febb40]"></div>
						</div>
						{#if loaded}
							<img
								src="/homePage/laptopMockup-{$mode}.png"
								draggable="false"
								class="h-full w-full object-cover object-center"
								alt="Laptop mockup"
							/>
						{/if}
					</div>
				</div>

				<!-- Phone mockup -->
				<div
					class="relative aspect-[8/17] w-full max-w-[250px] rounded-[2.5rem] border-[10px] border-gray-light bg-gray-light dark:border-slate-800 dark:bg-slate-800 lg:-ml-14 lg:mt-20"
				>
					<!-- Camera hole -->
					<!-- <div class="size-4 bg-gray-light dark:bg-slate-800 top-2 rounded-full left-1/2 -translate-x-1/2 absolute"></div> -->
					<div
						class="absolute -start-[12px] top-[25%] h-[45px] w-[4px] rounded-s-lg bg-gray-light dark:bg-slate-800"
					></div>
					<div
						class="absolute -start-[12px] top-[calc(25%+45px+10px)] h-[45px] w-[4px] rounded-s-lg bg-gray-light dark:bg-slate-800"
					></div>
					<div
						class="absolute -end-[12px] top-[30%] h-[35px] w-[4px] rounded-e-lg bg-gray-light dark:bg-slate-800"
					></div>
					<div
						class="absolute left-1/2 top-full -mt-[6px] h-[4px] w-[70px] -translate-x-1/2 rounded-full bg-neutral-700 dark:bg-slate-400"
					></div>
					<div class="h-full w-full overflow-hidden rounded-[2rem] bg-gray-light dark:bg-slate-800">
						{#if loaded}
							<img
								src="/homePage/phoneMockup-{$mode}.png"
								draggable="false"
								class="h-full w-full object-cover object-center"
								alt="Phone mockup"
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
