<script>
  import { page } from '$app/stores';
  import { Modal } from '$lib/components';

  let accountModalOpen = $state(false);
  let logOutModalOpen = $state(false);
</script>

<nav>
  <div class="flex flex-row px-4 py-2 h-14 items-center justify-between">
    {#if $page.params.id}
      <button onclick={() => {window.history.back()}} class="w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-full w-full">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </button>
    {:else}
      <span></span>
      <a href='/note'>
        <h1>
          Notes
        </h1>
      </a>
      <button class="p-2" onclick={() => {accountModalOpen = true;}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>
    {/if}
  </div>
</nav>

<!-- Account modal -->
<Modal bind:open={accountModalOpen}>
  <h2 class="mb-2">Account</h2>
  <div class="flex flex-col gap-4">
    <button class="p-2 hover:bg-black rounded flex flex-row gap-2" onclick={() => {accountModalOpen = false;logOutModalOpen = true;}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
      </svg>
      Log-out
    </button>
  </div>
</Modal>

<!-- Log-out confirm modal -->
<Modal bind:open={logOutModalOpen}>
  <h2 class="mb-2">Log-out</h2>
  <p>Are you sure you want to log-out of your account ?</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <button class="p-2 rounded bg-black" onclick={() => {logOutModalOpen = false;accountModalOpen = true;}}>
      No, Cancel
    </button>
    <a href="/log-out" class="p-2 bg-black rounded gap-2 text-center">
      Yes, Log-out
    </a>
  </div>
</Modal>
