<script>
	import { page } from '$app/stores';
	import { Modal, Button, Icon } from '$lib/components';
	import { afterNavigate } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	let accountModalOpen = $state(false);
	let logOutModalOpen = $state(false);

	afterNavigate(() => {
		accountModalOpen = false;
		logOutModalOpen = false;
	});
</script>

{#if $page.url.pathname.startsWith('/note')}
	<nav class="bg-black z-40">
		<div
			class="flex flex-row py-2 h-14 items-center justify-between {$page.params.id
				? 'px-2'
				: 'px-4'}"
		>
			{#if $page.params.id}
				<button
					onclick={() => {
						window.history.back();
					}}
					class="p-2"
				>
					<Icon name="back" />
				</button>
			{:else}
				<div class="p-2">
					<div class="size-6"></div>
				</div>
				<a href="/note">
					<h1>Notes</h1>
				</a>
				<button
					class="p-2"
					onclick={() => {
						accountModalOpen = true;
					}}
				>
					<Icon name="account" />
				</button>
			{/if}
		</div>
	</nav>
{:else}
  <div class="h-14"></div>
	<nav class="flex flex-row py-2 h-14 items-center justify-center text-center px-2 fixed top-0 left-0 right-0 bg-black z-40">
    <a href="/">
      <h1>Nothing Notes</h1>
    </a>
	</nav>
{/if}

<!-- Account modal -->
<Modal bind:open={accountModalOpen} title={$_("navBar.modals.account.title")}>
	<div class="flex flex-col gap-2">
		<Button
			onclick={() => {
				accountModalOpen = false;
				logOutModalOpen = true;
			}}
		>
			<Icon name="log-out" />
			{$_("navBar.modals.account.logOut")}
		</Button>
	</div>
</Modal>

<!-- Log-out confirm modal -->
<Modal bind:open={logOutModalOpen} title={$_("navBar.modals.logOutConfirm.title")}>
	<p>{$_("navBar.modals.logOutConfirm.message")}</p>
	<div class="grid grid-cols-2 gap-2 w-full mt-2">
		<Button
			center
			onclick={() => {
				logOutModalOpen = false;
				accountModalOpen = true;
			}}
		>
			{$_("navBar.modals.logOutConfirm.cancel")}
		</Button>
		<Button center href="/log-out">{$_("navBar.modals.logOutConfirm.confirm")}</Button>
	</div>
</Modal>
