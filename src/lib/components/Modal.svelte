<script>
	import { Drawer } from 'vaul-svelte';

	let { open = $bindable(), children, title } = $props();
</script>

<!-- Add shouldScaleBackground to the line below if she body should shrink when the modal is opened -->
<Drawer.Root bind:open>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 bg-gray/80 z-50" />
		<Drawer.Content
			class="fixed bottom-0 left-0 right-0 flex h-[80%] flex-col bg-black rounded-t-xl p-4 z-[51]"
		>
			<!-- IOS like bar -->
			<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray"></div>
			<div class="mx-auto max-w-md w-full overflow-hidden">
				{#if title}
					<div class="w-full flex flex-row items-center h-14 bg-black">
						<h2>{title}</h2>
					</div>
				{/if}
				<div class="overflow-auto h-full pb-14">
					{@render children()}
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
