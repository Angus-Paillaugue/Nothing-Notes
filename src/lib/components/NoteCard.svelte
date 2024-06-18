<script>
	import { Checkbox } from '$lib/components';
	import { twMerge } from 'tailwind-merge';
	import { noteBorderColors } from '$lib/constants';
	import { _ } from 'svelte-i18n';

	const { note, inactive = false, class: className, match, ...restProps } = $props();
	const items = note.items
		? note.items.sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1)).slice(0, 4)
		: undefined;
</script>

<a
	href={inactive ? 'javascript:void(0)' : `/note/${note.id}`}
	class={twMerge(
		'flex flex-col p-4 gap-2 rounded transition-all border border-gray ring-2 bg-black relative group',
		noteBorderColors.find((el) => el.name === note.color)?.class ?? 'ring-0',
		className
	)}
	{...restProps}
>
	<h2>{note.title || $_('note.placeholders.title')}</h2>
	{#if note.type === 'list' && note.items.length > 0}
		<ul>
			{#each items as item}
				<li class="line-clamp-1 flex flex-row items-center gap-2">
					<Checkbox checked={item.checked} class="size-4 shrink-0" />
					<p class="text-sm line-clamp-1">{@html item.content}</p>
				</li>
			{/each}
		</ul>
	{:else if note.content}
		<p class="line-clamp-5 text-sm whitespace-pre">{@html note.content}</p>
	{/if}
</a>
