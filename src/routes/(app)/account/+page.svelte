<script>
	import { _ } from 'svelte-i18n';
	import { Modal, Button, Icon } from '$lib/components';

	let logOutModalOpen = $state(false);
</script>

<!-- Navbar -->
<nav class="bg-black h-14 flex flex-row gap-2 items-center mb-6">
	<!-- Go back button -->
	<a href="/note" class="p-2">
		<Icon name="back" />
	</a>
</nav>

<section class="p-2 flex flex-col gap-4">
	<h1>{$_('account.title')}</h1>

	<div class="grid grid-cols-2 gap-2 max-w-[500px]">
		<Button
			onclick={() => {
				logOutModalOpen = true;
			}}
			class="aspect-video"
			center>{$_('account.logOut')}</Button
		>
		<Button href="/delete-account" class="aspect-video bg-red" center
			>{$_('account.deleteAccount')}</Button
		>
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
