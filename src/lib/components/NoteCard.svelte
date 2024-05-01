<script>
	import { Checkbox } from '$lib/components';
	import { twMerge } from 'tailwind-merge';
	import { noteBorderColors } from '$lib/constants';

	const { note, inactive = false, class: className } = $props();
</script>

<a
	href={inactive ? 'javascript:void(0)' : `/note/${note.id}`}
	class={twMerge(
		'flex flex-col p-4 gap-2 rounded transition-all border border-gray ring-2 bg-black relative group',
		noteBorderColors.find((el) => el.name === note.color)?.class ?? 'ring-0',
		className
	)}
>
	<h2>{note.title}</h2>
	{#if note.type === 'list'}
		<ul>
			{#each note.items.slice(0, 4) as item}
				<li class="line-clamp-1 flex flex-row items-center gap-2">
					<Checkbox checked={item.checked} class="size-4" />
					<p class="text-sm">{item.content}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="line-clamp-5 text-sm">{note.content}</p>
	{/if}
</a>
