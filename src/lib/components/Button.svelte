<script>
  import { twMerge } from 'tailwind-merge';

  const { children, class:className, href, center, ...restProps } = $props();
</script>

{#if href}
  <a class={twMerge(`p-2 bg-black transition-all rounded flex flex-row items-center gap-2 text-center button ${center && "justify-center"}`, className)} href={href} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={twMerge(`p-2 bg-black transition-all rounded flex flex-row items-center gap-2 text-center button ${center && "justify-center"}`, className)} {...restProps}>
    {@render children()}
  </button>
{/if}
