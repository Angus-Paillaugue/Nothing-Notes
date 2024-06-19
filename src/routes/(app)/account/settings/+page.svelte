<script>
	import { seo } from '$lib/stores';
	import { Input, Button, Hr, Loader, Error } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';

	const { form, data } = $props();
	const { user } = data;

	let isSaving = $state(false);
	let isChanging = $state(false);

	$seo.title = 'pageTitles.accountSettings';
	$seo.description = 'pageDescriptions.accountSettings';
</script>

<section class="flex flex-col items-center justify-center p-2 before:absolute before:content-[''] before:inset-0 before:pointer-events-none before:-z-10">
	<div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
		<h1>{$_('accountSettings.title')}</h1>
		<form
			class="flex flex-col gap-4"
			method="POST"
			action="?/changeEmail"
			use:enhance={() => {
				isSaving = true;
				return async ({ update }) => {
					isSaving = false;
					update();
				};
			}}
		>
			<Input value={user.username} readonly name="username" label={$_('accountSettings.form.username')} placeholder={$_('accountSettings.form.username')} />
			<Input value={form?.email ?? user.email ?? ''} name="email" label={$_('accountSettings.form.email')} placeholder={$_('accountSettings.form.email')} />
			{#if form?.type === 'emailChange'}
				<Error success={form?.success} message={form?.raw ? form?.message : $_(form.message)} />
			{/if}
			<Button center type="submit" class="w-full bg-black mt-2">
				{#if isSaving}
					<Loader />
				{:else}
					{$_('accountSettings.form.saveChanges')}
				{/if}
			</Button>
		</form>

		<Hr class="border-red" text={$_('accountSettings.form.dangerZone')} />

		<Button
			href="/delete-account"
			class="bg-red"
			center
		>
			{$_('account.deleteAccount')}
		</Button>
<!--

		<form
			class="flex flex-col gap-2"
			method="POST"
			action="?/changePassword"
			use:enhance={() => {
				isChanging = true;
				return async ({ update }) => {
					isChanging = false;
					update();
				};
			}}
		>
			<Input value={form?.password ?? ''} type="password" name="password" autocomplete="off" label={$_('accountSettings.form.password')} placeholder={$_('accountSettings.form.password')} />
			<Input value={form?.confirmPassword ?? ''} type="password" autocomplete="off" label={$_('accountSettings.form.confirmPassword')} name="confirmPassword" placeholder={$_('accountSettings.form.confirmPassword')} />
			<Button center type="submit" class="w-full bg-black mt-2">
				{#if isChanging}
					<Loader />
				{:else}
					{$_('accountSettings.form.change')}
				{/if}
			</Button>
		</form> -->
	</div>
</section>

<style>
	section::before {
		mix-blend-mode: screen;
		background: url("/homePage/noise.webp");
		background-size: 100px;
		-webkit-mask-image: radial-gradient(circle closest-side at 50% 20%, rgba(0, 0, 0, 0.30) 50%, transparent 100%);
		mask-image: radial-gradient(circle closest-side at 50% 30%, rgba(0, 0, 0, 0.30) 50%, transparent 100%);
	}

	@media not all and (min-width: 768px) {
		section::before {
			-webkit-mask-image: radial-gradient(circle closest-side at 50% 20%, rgba(0, 0, 0, 0.30) 20%, transparent 100%);
			mask-image: radial-gradient(circle closest-side at 50% 20%, rgba(0, 0, 0, 0.30) 40%, transparent 100%);
		}
	}
</style>
