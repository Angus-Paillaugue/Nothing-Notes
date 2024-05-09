<script>
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';
	import { Button, Error, Input } from '$lib/components';

	const { form } = $props();

	let isLoading = $state(false);

	$seo.title = 'pageTitles.resetPassword';
	$seo.description = 'pageDescriptions.resetPassword';
</script>

<section class="flex flex-col items-center justify-center grow p-2">
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('resetPassword.title')}</h1>
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
			<Input
				value={form?.password ?? ''}
				type="password"
				name="password"
				placeholder={$_('resetPassword.form.password')}
			/>
			<Input
				value={form?.cpassword ?? ''}
				type="password"
				name="cpassword"
				placeholder={$_('resetPassword.form.confirmPassword')}
			/>
			<Button center loading={isLoading} type="submit" class="w-full bg-black mt-2">
				{$_('resetPassword.form.submit')}
			</Button>
		</form>
		{#if form?.message}
			<Error message={form.message} success={form?.success} />
		{/if}
	</div>
</section>
