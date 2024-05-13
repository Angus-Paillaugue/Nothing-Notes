<script>
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";
	import { fade, fly } from "svelte/transition";
  import { Button } from "$lib/components";

  let show = $state(false);

  onMount(() => {
    show = localStorage.getItem("cookie-consent") === null;
  });

  const buttonClick = (e) => {
    localStorage.setItem("cookie-consent", e.target.id === "accept");
    show = false;
  };
</script>

{#if show}
  <!-- Backdrop -->
  <div class="inset-0 fixed bg-gray/70 z-50" in:fade out:fade></div>
  <div class="fixed bottom-2 left-2 md:max-w-[500px] sm:w-full max-sm:right-2 flex flex-col gap-2 z-50 p-4 rounded bg-black" in:fly={{ y:'100%' }} out:fly={{ y:'100%' }}>
    <h1>{ $_("cookieModal.title") }</h1>
    <p>{ $_("cookieModal.description") }</p>
    <div class="grid grid-cols-2 gap-2">
      <Button onclick={buttonClick} center id='decline'>{ $_("cookieModal.decline") }</Button>
      <Button onclick={buttonClick} center id='accept'>{ $_("cookieModal.accept") }</Button>
    </div>
  </div>
{/if}
