<script>
  import { twMerge } from 'tailwind-merge';
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '$lib/components';

  const { name, class: classList, removable = false, ...restProps } = $props();
  const dispatch = createEventDispatcher();
</script>

<div class={twMerge("flex flex-row items-center text-center bg-black px-2 py-1 border rounded-full border-white text-base italic font-medium group", classList)} {...restProps}>
  {name}
  {#if removable}
    <button class="rounded p-1 size-0 invisible group-hover:visible group-hover:size-6 duration-300 ease-in-out -rotate-180 group-hover:rotate-0 -ml-1 group-hover:ml-2 transition-all hover:bg-gray" onclick={() => {dispatch('delete', { name })}}>
      <Icon name="close" class="cursor-pointer w-full h-full" />
    </button>
  {/if}
</div>
