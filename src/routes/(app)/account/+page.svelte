<script>
	import { _ } from 'svelte-i18n';
	import { Modal, Button } from '$lib/components';
	import Navbar from '../Navbar.svelte';

	let logOutModalOpen = $state(false);
</script>

<Navbar text={$_('account.title')} back={true} />

<section
	class="flex flex-col items-center justify-center p-2 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-['']"
>
	<div class="flex w-full max-w-[500px] flex-col gap-4 rounded bg-gray-light p-4 dark:bg-gray">
		<h1>{$_('account.title')}</h1>

		<div class="grid max-w-[500px] grid-cols-2 gap-2">
			<Button
				onclick={() => {
					logOutModalOpen = true;
				}}
				class="aspect-video bg-white dark:bg-black"
				center
			>
				{$_('account.logOut')}
			</Button>
			<Button href="/account/settings" class="aspect-video bg-white dark:bg-black" center>
				{$_('account.settings')}
			</Button>
		</div>
	</div>
</section>

<!-- Log-out confirm modal -->
<Modal bind:open={logOutModalOpen} title={$_('account.modals.logOutConfirm.title')}>
	<p>{$_('account.modals.logOutConfirm.message')}</p>
	<div class="mt-2 grid w-full grid-cols-2 gap-2">
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
