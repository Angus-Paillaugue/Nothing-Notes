<script>
	import { Button } from '$lib/components';
	import { _ } from 'svelte-i18n';

	let { getStartedModalOpen = $bindable() } = $props();
</script>

<section class="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center relative">
	<div
		class="absolute inset-0 -z-10 opacity-30"
		style="background: url(/homePage/noise.webp), radial-gradient(circle farthest-corner at 0 0, #000 30%, #D71921 65%, #f0f2f2 80%, #249688 110%) no-repeat, radial-gradient(closest-side at 60% 50%, #f0f2f2 20%, #000 100%) no-repeat; mix-blend-mode: screen; background-size: 140px, 100%, cover; background-blend-mode: overlay;"
	></div>
	<div class="max-w-screen-lg px-4 md:px-6 mx-auto">
		<div class="flex flex-col gap-10">
			<div class="flex flex-col justify-center space-y-4 max-lg:text-center">
				<!-- <div class="flex flex-row gap-4 overflow-x-auto">
          {#snippet pill(text, borderColor, bgColor)}
            <div class="rounded-full border text-center px-3 py-1 text-base font-bold italic text-black {borderColor} {bgColor}">
              #{text}
            </div>
          {/snippet}
          {@render pill('Notes', 'border-amber-300', 'bg-amber-100')}
          {@render pill('Nothing', 'border-amber-300', 'bg-amber-100')}
          {@render pill('Updated', 'border-amber-300', 'bg-amber-100')}
        </div> -->
				<h1 class="text-5xl sm:text-5xl xl:text-8xl">Nothing Notes</h1>
				<p class="text-2xl sm:text-3xl text-white opacity-70">
					{$_('homePage.hero.subtitle')}
				</p>
				<div class="flex flex-row items-center justify-center lg:justify-start gap-2">
					<Button
						onclick={() => {
							getStartedModalOpen = true;
						}}
						class="font-bold text-lg lg:px-8 lg:py-4"
					>
						{$_('homePage.hero.cta.title')}
					</Button>
				</div>
			</div>

			<!-- Mockups -->
			<div class="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start z-0">
				<!-- Laptop mockup -->
				<div
					class="relative max-lg:hidden border-slate-800 bg-slate-800 border-[8px] rounded-[.7rem] max-w-[800px] w-full aspect-video"
				>
					<div class="rounded-[.25rem] overflow-hidden bg-slate-800 relative">
						<div
							class="flex flex-row items-center justify-start px-2 py-[4px] bg-black gap-[.3rem] border-b border-gray"
						>
							<div class="size-3 rounded-full bg-[#fd5754] border border-[#d52735]"></div>
							<div class="size-3 rounded-full bg-[#34c848] border border-[#13c11e]"></div>
							<div class="size-3 rounded-full bg-[#febb40] border border-[#da9e10]"></div>
						</div>
						<img
							src="/homePage/laptopMockup.png"
							draggable="false"
							class="w-full h-full object-cover object-center"
							alt=""
						/>
					</div>
				</div>

				<!-- Phone mockup -->
				<div
					class="relative border-slate-800 bg-slate-900 border-[10px] rounded-[2.5rem] aspect-[8/17] max-w-[250px] w-full lg:mt-20 lg:-ml-14"
				>
					<!-- Camera hole -->
					<!-- <div class="size-4 bg-slate-800 top-2 rounded-full left-1/2 -translate-x-1/2 absolute"></div> -->
					<div
						class="h-[45px] w-[4px] bg-slate-800 absolute -start-[12px] top-[25%] rounded-s-lg"
					></div>
					<div
						class="h-[45px] w-[4px] bg-slate-800 absolute -start-[12px] top-[calc(25%+45px+10px)] rounded-s-lg"
					></div>
					<div
						class="h-[35px] w-[4px] bg-slate-800 absolute -end-[12px] top-[30%] rounded-e-lg"
					></div>
					<div
						class="h-[4px] w-[70px] bg-slate-200 absolute left-1/2 -translate-x-1/2 top-full -mt-[6px] rounded-full"
					></div>
					<div class="rounded-[2rem] overflow-hidden bg-slate-800 w-full h-full">
						<img
							src="/homePage/phoneMockup.png"
							draggable="false"
							class="w-full h-full object-cover object-center"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
