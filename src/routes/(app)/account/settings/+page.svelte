<script>
	import { seo } from '$lib/stores';
	import { Input, Button, Hr, Error, Icon } from '$lib/components';
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { mode, toggleMode } from 'mode-watcher';
	import { scale } from 'svelte/transition';
	import Navbar from '../../Navbar.svelte';

	const { form, data } = $props();
	const { user } = data;

	let isSaving = $state(false);
	let isChanging = $state(false);

	$seo.title = 'pageTitles.accountSettings';
	$seo.description = 'pageDescriptions.accountSettings';
</script>

<Navbar back={true} account={false} text={$_('accountSettings.title')} />

<section
	class="flex flex-col items-center justify-center p-2 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-['']"
>
	<div class="flex w-full max-w-[500px] flex-col gap-4 rounded bg-gray-light p-4 dark:bg-gray">
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
			<Input
				value={user.username}
				readonly
				name="username"
				label={$_('accountSettings.form.username')}
				labelIcon="help"
				labelIconTooltip={$_('accountSettings.form.usernameTooltip')}
				placeholder={$_('accountSettings.form.username')}
			/>
			<Input
				value={form?.email ?? user.email ?? ''}
				name="email"
				label={$_('accountSettings.form.email')}
				placeholder={$_('accountSettings.form.email')}
			/>
			{#if form?.type === 'emailChange'}
				<Error success={form?.success} message={form?.raw ? form?.message : $_(form.message)} />
			{/if}
			<Button center loading={isSaving} type="submit" class="mt-2 w-full bg-white dark:bg-black">
				{$_('accountSettings.form.saveChanges')}
			</Button>
		</form>

		<Hr class="border-gray dark:border-black" text={$_('accountSettings.theme.separatorTitle')} />

		<!-- Theme switcher -->
		<div class="flex flex-row items-center gap-4">
			<Button
				class="flex size-10 flex-col items-center justify-center bg-white p-2 dark:bg-black"
				onclick={toggleMode}
			>
				{#if $mode === 'dark'}
					<div in:scale={{ duration: 200 }}>
						<Icon name="moon" class="size-6" />
					</div>
				{:else}
					<div in:scale={{ duration: 200 }}>
						<Icon name="sun" class="size-6" />
					</div>
				{/if}
			</Button>
			<h4>{$_(`accountSettings.theme.${$mode}`)}</h4>
		</div>

		<Hr class="border-red" text={$_('accountSettings.form.dangerZone')} />

		<Button href="/delete-account" class="bg-red text-white dark:bg-red dark:text-black" center>
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
		background: url('/homePage/noise.webp');
		background-size: 100px;
		-webkit-mask-image: radial-gradient(
			circle closest-side at 50% 20%,
			rgba(0, 0, 0, 0.3) 50%,
			transparent 100%
		);
		mask-image: radial-gradient(
			circle closest-side at 50% 30%,
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
				rgba(0, 0, 0, 0.3) 40%,
				transparent 100%
			);
		}
	}
</style>
