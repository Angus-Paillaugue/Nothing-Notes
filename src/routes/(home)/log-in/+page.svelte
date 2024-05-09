<script>
	import { enhance } from '$app/forms';
	import { Button, Loader, Error, Input } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';

	const { form } = $props();

	let isLoggingIn = $state(false);

	$seo.title = 'pageTitles.logIn';
	$seo.description = 'pageDescriptions.logIn';
</script>

<section class="flex flex-col items-center justify-center grow p-2">
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('logIn.title')}</h1>
		<form
			class="flex flex-col gap-2"
			method="POST"
			use:enhance={() => {
				isLoggingIn = true;
				return async ({ update }) => {
					isLoggingIn = false;
					update();
				};
			}}
		>
			<Input value={form?.email ?? ''} name="email" placeholder={$_('logIn.form.email')} />
			<Input
				value={form?.password ?? ''}
				type="password"
				name="password"
				placeholder={$_('logIn.form.password')}
			/>
			<Button center type="submit" class="w-full bg-black mt-2">
				{#if isLoggingIn}
					<Loader />
				{:else}
					{$_('logIn.form.submit')}
				{/if}
			</Button>
		</form>
		{#if form?.error}
			<Error message={form.error} />
		{/if}
		<a href="/sign-up" class="text-sm">{$_('logIn.form.cta')}</a>
	</div>
</section>
