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

<section
	class="flex grow flex-col items-center justify-center p-2 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-['']"
>
	<div class="flex w-full max-w-[500px] flex-col gap-4 rounded bg-gray-light p-4 dark:bg-gray">
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
			<Input
				value={form?.username ?? ''}
				name="username"
				placeholder={$_('signUp.form.username')}
			/>
			<Input value={form?.email ?? ''} name="email" placeholder={$_('signUp.form.email')} />
			<Input
				value={form?.password ?? ''}
				type="password"
				name="password"
				placeholder={$_('signUp.form.password')}
			/>
			<Button center loading={isSigningIn} type="submit" class="mt-2 w-full bg-white dark:bg-black">
				{$_('signUp.form.submit')}
			</Button>
		</form>
		{#if form?.error}
			<Error message={form.error} />
		{/if}
		<a href="/log-in" class="text-sm">{$_('signUp.form.cta')}</a>
	</div>
</section>

<style>
	section::before {
		mix-blend-mode: screen;
		background: url('/homePage/noise.webp');
		background-size: 100px;
		-webkit-mask-image: radial-gradient(
			circle closest-side at 50% 50%,
			rgba(0, 0, 0, 0.3) 50%,
			transparent 100%
		);
		mask-image: radial-gradient(
			circle closest-side at 50% 50%,
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
				rgba(0, 0, 0, 0.3) 20%,
				transparent 100%
			);
		}
	}
</style>
