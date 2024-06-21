<script>
	import { twMerge } from 'tailwind-merge';

	const { children, content, class: className, ...restProps } = $props();
</script>

<div class={twMerge('group relative', className)} {...restProps}>
	{@render children()}

	<div
		class="invisible absolute bottom-full right-0 z-30 mb-2 w-max max-w-[200px] opacity-0 transition-all group-hover:visible group-hover:opacity-100"
	>
		<div class="relative rounded bg-gray-light p-2 dark:bg-gray">
			{@html content}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="absolute right-2 top-[calc(100%-0.5rem)] size-6 fill-gray-light dark:fill-gray"
				viewBox="0 0 16 16"
			>
				<path
					d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
				/>
			</svg>
		</div>
	</div>
</div>
