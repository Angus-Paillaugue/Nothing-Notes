<script>
	import { enhance } from '$app/forms';
	import { Button, Error, Input } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';

	const { form } = $props();

	let isLoggingIn = $state(false);

	$seo.title = 'pageTitles.logIn';
	$seo.description = 'pageDescriptions.logIn';
</script>

<section
	class="flex flex-col items-center justify-center grow p-2 before:absolute before:content-[''] before:inset-0 before:pointer-events-none before:-z-10"
>
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
			<Button center loading={isLoggingIn} type="submit" class="w-full bg-black mt-2">
				{$_('logIn.form.submit')}
			</Button>
		</form>
		{#if form?.error}
			<Error message={form.error} />
		{/if}
		<a href="/forgot-password" class="text-sm">{$_('logIn.form.forgotPassword')}</a>
		<a href="/sign-up" class="text-sm">{$_('logIn.form.cta')}</a>
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
