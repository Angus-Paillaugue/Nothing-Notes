<script>
    import { enhance } from '$app/forms';

    const { form } = $props();
</script>

<section class="flex flex-col items-center justify-center h-screen p-2">
    <div class="p-4 rounded flex flex-col gap-4 bg-gray w-full max-w-[500px]">
        <h1>Sign-up</h1>
        <form class="flex flex-col gap-2" method="POST" use:enhance>
            <input type="text" placeholder="Username" value={form?.username ?? ''} name="username" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <input type="text" placeholder="E-mail" value={form?.email ?? ''} name="email" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <input type="password" placeholder="Password" value={form?.password ?? ''} name="password" class="bg-black px-2 py-1 text-sm tracking-tight w-full rounded placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot" style="border: 1px dashed white;" />
            <button type="submit" class="w-full px-4 py-2 text-lg bg-black rounded mt-2">Sign-up</button>
        </form>
        {#if form?.error}
            <div class="p-6 rounded-full bg-black flex flex-row gap-4 items-center">
                <div class="rounded-full w-16 h-16 bg-red flex flex-col items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>
                <p class="error">{form.error}</p>
            </div>
        {/if}
        <a href="/sign-up" class="text-sm">Already have an account? Log-in</a>
    </div>
</section>
