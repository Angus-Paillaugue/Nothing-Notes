<script>
	import { Checkbox, Tag } from '$lib/components';
	import { twMerge } from 'tailwind-merge';
	import { noteBorderColors } from '$lib/constants';
	import { _ } from 'svelte-i18n';

	const { note, inactive = false, class: className, ...restProps } = $props();
	const items = note?.items
		? note.items.sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1)).slice(0, 4)
		: undefined;
</script>

<a
	href={inactive ? 'javascript:void(0)' : `/note/${note.id}`}
	class={twMerge(
		'group relative flex flex-col gap-2 rounded border border-gray-light bg-white p-4 ring-2 transition-all dark:border-gray dark:bg-black',
		noteBorderColors.find((el) => el.name === note.color)?.class ?? 'ring-0',
		className
	)}
	{...restProps}
>
	<h2 class="line-clamp-2 leading-6">{note.title || $_('note.placeholders.title')}</h2>

	<!-- Tags -->
	{#if note.tags.length > 0}
		<div class="flex flex-row items-center justify-start gap-2">
			{#each note.tags as tag}
				<Tag size="sm" name={tag} />
			{/each}
		</div>
	{/if}

	{#if note.type === 'list' && note.items.length > 0}
		<ul>
			{#each items as item}
				<li class="line-clamp-1 flex flex-row items-center gap-2">
					<Checkbox checked={item.checked} class="size-4 shrink-0" />
					<p class="line-clamp-1 text-sm">{@html item.content}</p>
				</li>
			{/each}
		</ul>
	{:else if note.content}
		<p class="line-clamp-5 whitespace-pre text-sm">{@html note.content}</p>
	{/if}
</a>
