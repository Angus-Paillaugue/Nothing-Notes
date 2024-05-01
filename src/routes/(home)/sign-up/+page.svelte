<script>
	import { enhance } from '$app/forms';
	import { Button, Loader, Error } from '$lib/components';
	import { _ } from 'svelte-i18n';

	const { form } = $props();
	let isSigningIn = $state(false);
</script>

<svelte:head>
	<title>{$_('signUp.title')}</title>
</svelte:head>

<section class="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] p-2">
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('signUp.title')}</h1>
		<form
			class="flex flex-col gap-2"
			method="POST"
			use:enhance={() => {
				isSigningIn = true;
				return async ({ update }) => {
					isSigningIn = false;
					update();
				};
			}}
		>
			<input
				type="text"
				placeholder={$_('signUp.form.username')}
				value={form?.username ?? ''}
				name="username"
				class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot"
				style="border: 1px dashed white;"
			/>
			<input
				type="text"
				placeholder={$_('signUp.form.email')}
				value={form?.email ?? ''}
				name="email"
				class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot"
				style="border: 1px dashed white;"
			/>
			<input
				type="password"
				placeholder={$_('signUp.form.password')}
				value={form?.password ?? ''}
				name="password"
				class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot"
				style="border: 1px dashed white;"
			/>
			<Button center type="submit" class="w-full bg-black mt-2">
				{#if isSigningIn}
					<Loader />
				{:else}
					{$_('signUp.form.submit')}
				{/if}
			</Button>
		</form>
		{#if form?.error}
			<Error message={form.error} />
		{/if}
		<a href="/log-in" class="text-sm">{$_('signUp.form.cta')}</a>
	</div>
</section>
