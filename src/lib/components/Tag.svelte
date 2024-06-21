<script>
  import { twMerge } from 'tailwind-merge';
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '$lib/components';

  const { name, class: classList, removable = false, size="md", ...restProps } = $props();
  const dispatch = createEventDispatcher();

  const sizes = {
    sm: 'text-xs px-1 py-0.5',
    md: 'text-base px-2 py-1',
    lg: 'text-lg px-3 py-1.5',
  };
</script>

<div class={twMerge("flex flex-row items-center text-center bg-black border rounded-full border-white italic font-medium group", sizes[size], classList)} {...restProps}>
  {name}
  {#if removable}
    <button class="rounded p-1 size-0 invisible group-hover:visible group-hover:size-6 duration-300 ease-in-out -rotate-180 group-hover:rotate-0 -ml-1 group-hover:ml-2 transition-all hover:bg-gray" onclick={() => {dispatch('delete', { name })}}>
      <Icon name="close" class="cursor-pointer w-full h-full" />
    </button>
  {/if}
</div>
