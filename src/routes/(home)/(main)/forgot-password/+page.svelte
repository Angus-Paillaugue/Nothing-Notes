<script>
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';
	import { Button, Error, Input } from '$lib/components';

	const { form } = $props();

	let isLoading = $state(false);

	$seo.title = 'pageTitles.forgotPassword';
	$seo.description = 'pageDescriptions.forgotPassword';
</script>

<section
	class="flex flex-col items-center justify-center grow p-2 before:absolute before:content-[''] before:inset-0 before:pointer-events-none before:-z-10"
>
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('forgotPassword.title')}</h1>
		<form
			class="flex flex-col gap-2"
			method="POST"
			action="?/reset"
			use:enhance={() => {
				isLoading = true;
				return async ({ update }) => {
					isLoading = false;
					update();
				};
			}}
		>
			<Input value={form?.email ?? ''} name="email" placeholder={$_('forgotPassword.form.email')} />
			<Button center loading={isLoading} type="submit" class="w-full bg-black mt-2">
				{$_('forgotPassword.form.submit')}
			</Button>
		</form>
		{#if form?.message}
			<Error message={form.message} success={form?.success ?? false} />
		{/if}
		<a href="/log-in" class="text-sm">{$_('forgotPassword.form.remember')}</a>
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
