<script>
  import { page } from '$app/stores';
  import { Modal, Button, Icon } from '$lib/components';

  let accountModalOpen = $state(false);
  let logOutModalOpen = $state(false);
</script>

<nav>
  <div class="flex flex-row px-4 py-2 h-14 items-center justify-between">
    {#if $page.params.id}
      <button onclick={() => {window.history.back()}} class="p-2">
        <Icon name="back" />
      </button>
    {:else}
      <div class="p-2">
        <div class="size-6"></div>
      </div>
      <a href='/note'>
        <h1>
          Notes
        </h1>
      </a>
      <button class="p-2" onclick={() => {accountModalOpen = true;}}>
        <Icon name="account" />
      </button>
    {/if}
  </div>
</nav>

<!-- Account modal -->
<Modal bind:open={accountModalOpen} title="Account">
  <div class="flex flex-col gap-2">
    <Button onclick={() => {accountModalOpen = false;logOutModalOpen = true;}}>
      <Icon name="log-out" />
      Log-out
    </Button>
  </div>
</Modal>

<!-- Log-out confirm modal -->
<Modal bind:open={logOutModalOpen} title="Log-out">
  <p>Are you sure you want to log-out of your account ?</p>
  <div class="grid grid-cols-2 gap-2 w-full mt-2">
    <Button center onclick={() => {logOutModalOpen = false;accountModalOpen = true;}}>
      No, Cancel
    </Button>
    <Button center href="/log-out">
      Yes, Log-out
    </Button>
  </div>
</Modal>
