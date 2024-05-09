<script>
	import { _ } from 'svelte-i18n';
	import { Button } from '$lib/components';
	import { enhance } from '$app/forms';

	const { data } = $props();
	const { user } = data;

	let isDeletingAccount = $state(false);
</script>

<!-- Navbar -->
<nav
	class="fixed top-0 left-0 right-0 z-40 max-w-screen-lg mx-auto bg-black flex flex-row gap-2 items-center justify-between h-14"
>
	<div class="p-2">
		<div class="size-6"></div>
	</div>
	<a href="/note">
		<h1>Notes</h1>
	</a>
	<div class="p-2">
		<div class="size-6"></div>
	</div>
</nav>

<section class="flex flex-col items-center justify-center p-2 mt-36">
	<div
		class="max-w-sm w-full border rounded p-2 flex flex-col gap-4"
		style="border: 1px dashed white;"
	>
		{#if !user}
			<h1>{$_('deleteAccount.notLoggedIn.title')}</h1>
			<p>{$_('deleteAccount.notLoggedIn.message')}</p>
			<Button center href="/log-in" class="w-full">{$_('deleteAccount.notLoggedIn.logIn')}</Button>
		{:else}
			<h1>{$_('deleteAccount.title')}</h1>
			<p>{$_('deleteAccount.message')}</p>
			<div class="grid grid-cols-2 w-full gap-4">
				<Button
					center
					onclick={() => {
						window.history.back();
					}}
					class="w-full">{$_('deleteAccount.cancel')}</Button
				>
				<form
					action="?/deleteAccount"
					method="POST"
					use:enhance={() => {
						isDeletingAccount = true;
						return async ({ update }) => {
							isDeletingAccount = false;
							update();
						};
					}}
				>
					<Button center loading={isDeletingAccount} type="submit" class="w-full"
						>{$_('deleteAccount.confirm')}</Button
					>
				</form>
			</div>
		{/if}
	</div>
</section>
