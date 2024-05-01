<script>
    import { enhance } from '$app/forms';
    import { Icon, Button, Loader } from '$lib/components';
    import { _ } from 'svelte-i18n';

    const { form } = $props();
    let isLoggingIn = $state(false);
</script>

<svelte:head>
    <title>{$_("logIn.title")}</title>
</svelte:head>

<section class="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] p-2">
    <div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
        <h1>{$_("logIn.title")}</h1>
        <form class="flex flex-col gap-2" method="POST" use:enhance={() => {
            isLoggingIn = true;
            return async ({ update }) => {
                isLoggingIn = false;
                update();
            };
        }}>
            <input type="text" placeholder={$_("logIn.form.email")} value={form?.email ?? ''} name="email" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <input type="password" placeholder={$_("logIn.form.password")} value={form?.password ?? ''} name="password" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <Button center type="submit" class="w-full bg-black mt-2">
                {#if isLoggingIn}
                    <Loader />
                {:else}
                    {$_("logIn.form.submit")}
                {/if}
            </Button>
        </form>
        {#if form?.error}
            <div class="p-6 rounded-full bg-black flex flex-row gap-4 items-center">
                <div class="rounded-full size-16 bg-red flex flex-col items-center justify-center shrink-0">
                    <Icon name="warning" />
                </div>
                <p class="error">{$_(form.error)}</p>
            </div>
        {/if}
        <a href="/sign-up" class="text-sm">{$_("logIn.form.cta")}</a>
    </div>
</section>
