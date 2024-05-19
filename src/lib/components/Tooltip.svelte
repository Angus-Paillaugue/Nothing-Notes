<script>
  import { twMerge } from 'tailwind-merge';

  const { children, content, class:className, ...restProps } = $props();
</script>

<div class={twMerge("relative group", className)} {...restProps}>
  {@render children()}

  <div
    class="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible z-30 transition-all max-w-[200px] w-max"
  >
    <div class="relative p-2 rounded bg-gray">
      {@html content}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="size-6 absolute top-[calc(100%-0.5rem)] right-2 fill-gray"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
    </div>
  </div>

</div>
