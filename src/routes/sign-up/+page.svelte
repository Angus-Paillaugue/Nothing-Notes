<script>
    import { enhance } from '$app/forms';
    import { Icon } from '$lib/components';

    const { form } = $props();
    let isSigningIn = $state(false);
</script>

<section class="flex flex-col items-center justify-center h-screen p-2">
    <div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
        <h1>Sign-up</h1>
        <form class="flex flex-col gap-2" method="POST" use:enhance={() => {
            isSigningIn = true;
            return async ({ update }) => {
                isSigningIn = false;
                update();
            };
        }}>
            <input type="text" placeholder="Username" value={form?.username ?? ''} name="username" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <input type="text" placeholder="E-mail" value={form?.email ?? ''} name="email" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <input type="password" placeholder="Password" value={form?.password ?? ''} name="password" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <button type="submit" class="w-full px-4 py-2 text-lg bg-black rounded mt-2">
                {#if isLoggingIn}
                    <Loader />
                {:else}
                    Sign up
                {/if}
            </button>
        </form>
        {#if form?.error}
            <div class="p-6 rounded-full bg-black flex flex-row gap-4 items-center">
                <div class="rounded-full size-16 bg-red flex flex-col items-center justify-center shrink-0">
                    <Icon name="warning" />
                </div>
                <p class="error">{form.error}</p>
            </div>
        {/if}
        <a href="/sign-up" class="text-sm">Already have an account? Log-in</a>
    </div>
</section>
