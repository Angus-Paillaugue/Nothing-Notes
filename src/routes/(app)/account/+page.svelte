<script>
	import { _ } from 'svelte-i18n';
	import { Modal, Button } from '$lib/components';

	let logOutModalOpen = $state(false);
</script>

<section
	class="flex flex-col items-center justify-center p-2 before:absolute before:content-[''] before:inset-0 before:pointer-events-none before:-z-10"
>
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('account.title')}</h1>

		<div class="grid grid-cols-2 gap-2 max-w-[500px]">
			<Button
				onclick={() => {
					logOutModalOpen = true;
				}}
				class="aspect-video bg-black"
				center
			>
				{$_('account.logOut')}
			</Button>
			<Button href="/account/settings" class="aspect-video bg-black" center>
				{$_('account.settings')}
			</Button>
		</div>
	</div>
</section>

<!-- Log-out confirm modal -->
<Modal bind:open={logOutModalOpen} title={$_('account.modals.logOutConfirm.title')}>
	<p>{$_('account.modals.logOutConfirm.message')}</p>
	<div class="grid grid-cols-2 gap-2 w-full mt-2">
		<Button
			center
			onclick={() => {
				logOutModalOpen = false;
			}}
		>
			{$_('account.modals.logOutConfirm.cancel')}
		</Button>
		<Button center href="/log-out">{$_('account.modals.logOutConfirm.confirm')}</Button>
	</div>
</Modal>

<style>
	section::before {
		mix-blend-mode: screen;
		background: url('/homePage/noise.webp');
		background-size: 100px;
		-webkit-mask-image: radial-gradient(
			circle closest-side at 50% 20%,
			rgba(0, 0, 0, 0.3) 50%,
			transparent 100%
		);
		mask-image: radial-gradient(
			circle closest-side at 50% 30%,
			rgba(0, 0, 0, 0.3) 50%,
			transparent 100%
		);
	}

	@media not all and (min-width: 768px) {
		section::before {
			-webkit-mask-image: radial-gradient(
				circle closest-side at 50% 20%,
				rgba(0, 0, 0, 0.3) 20%,
				transparent 100%
			);
			mask-image: radial-gradient(
				circle closest-side at 50% 20%,
				rgba(0, 0, 0, 0.3) 40%,
				transparent 100%
			);
		}
	}
</style>
