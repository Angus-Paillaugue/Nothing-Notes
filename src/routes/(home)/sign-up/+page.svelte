<script>
	import { enhance } from '$app/forms';
	import { Button, Error, Input } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';

	const { form } = $props();

	let isSigningIn = $state(false);

	$seo.title = 'pageTitles.signUp';
	$seo.description = 'pageDescriptions.error';
</script>

<section class="flex flex-col items-center justify-center grow p-2">
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
			<Input value={form?.username ?? ''} name="username" placeholder={$_('logIn.form.username')} />
			<Input value={form?.email ?? ''} name="email" placeholder={$_('logIn.form.email')} />
			<Input
				value={form?.password ?? ''}
				type="password"
				name="password"
				placeholder={$_('logIn.form.password')}
			/>
			<Button center loading={isSigningIn} type="submit" class="w-full bg-black mt-2">
				{$_('signUp.form.submit')}
			</Button>
		</form>
		{#if form?.error}
			<Error message={form.error} />
		{/if}
		<a href="/log-in" class="text-sm">{$_('signUp.form.cta')}</a>
	</div>
</section>
