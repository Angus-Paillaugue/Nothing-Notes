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
	class="fixed left-0 right-0 top-0 z-40 mx-auto flex h-14 max-w-screen-lg flex-row items-center justify-between gap-2 bg-white dark:bg-black"
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

<section class="mt-36 flex flex-col items-center justify-center p-2">
	<!-- ! Hard coded red hex value -->
	<div
		class="flex w-full max-w-sm flex-col gap-4 rounded border p-2"
		style="border: 1px dashed #d71921;"
	>
		{#if !user}
			<h1>{$_('deleteAccount.notLoggedIn.title')}</h1>
			<p>{$_('deleteAccount.notLoggedIn.message')}</p>
			<Button center href="/log-in" class="w-full">{$_('deleteAccount.notLoggedIn.logIn')}</Button>
		{:else}
			<h1>{$_('deleteAccount.title')}</h1>
			<p>{$_('deleteAccount.message')}</p>
			<div class="grid w-full grid-cols-2 gap-4">
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
