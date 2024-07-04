<script>
	import { Modal, Hr, NoteCard, Loader, Button, Icon, Input } from '$lib/components';
	import { noteBorderColors } from '$lib/constants';
	import { _ } from 'svelte-i18n';
	import { seo, isOffline } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Fuse from 'fuse.js';
	import Navbar from '../Navbar.svelte';

	const { data } = $props();

	let notes = $state(data.notes);
	let newNoteModalOpen = $state(false);
	let archivedNotesModalOpen = $state(false);
	let unArchivingNote = $state(undefined);
	let isCreatingTextNote = $state(false);
	let isCreatingListNote = $state(false);
	let searchNotesModalOpen = $state(false);
	let searchNotesMatching = $state([]);

	$seo.title = 'pageTitles.notes';
	$seo.description = 'pageDescriptions.notes';

	/**
	 * Saves the given note.
	 *
	 * @param {object} note - The note to be saved.
	 * @returns {Promise} A promise that resolves when the note is saved.
	 */
	async function saveNote(note) {
		const res = await fetch(`/api/${note.type === 'text' ? 'saveTextNote' : 'saveListNote'}`, {
			method: 'POST',
			body: JSON.stringify(note)
		});

		if (!res.ok) console.log(res);
	}

	/**
	 * Unarchives a note.
	 *
	 * @param {Object} note - The note to be unarchived.
	 * @returns {Promise} - A promise that resolves when the note is successfully unarchived.
	 */
	const unArchiveNote = async (note) => {
		unArchivingNote = note.id;
		note.archived = false;
		await saveNote(note);
		unArchivingNote = undefined;
	};

	const fuseOptionsList = {
		threshold: 0.4,
		ignoreLocation: true,
		keys: ['title', 'items.content', 'tags']
	};
	const fuseOptionsText = {
		threshold: 0.4,
		ignoreLocation: true,
		keys: ['title', 'content', 'tags']
	};

	const fuseList = new Fuse(
		notes.filter((el) => el.type === 'list' && !el.archived),
		fuseOptionsList
	);
	const fuseText = new Fuse(
		notes.filter((el) => el.type === 'text' && !el.archived),
		fuseOptionsText
	);


	/**
	 * Performs a search for notes.
	 *
	 * @param {Event} e - The event object.
	*/
	function searchNotes(e) {
		const { value } = e.target;
		if (!value) return (searchNotesMatching = []);
		searchNotesMatching = [...fuseList.search(value), ...fuseText.search(value)].map(
			(el) => el.item
		);
	}

	$effect(() => {
		if (searchNotesModalOpen) {
			searchNotesMatching = [];
			document.getElementById('search').focus();
		}
	});
</script>

<svelte:head>
	<title>{$_('notes.title')}</title>
</svelte:head>

<!-- Navbar -->
<Navbar text={$_('notes.title')} account={true} />

{#if notes.filter((el) => !el.archived).length === 0}
	<h2>{$_('notes.noNotes')}</h2>
{/if}

{#if notes.filter((el) => el.pinned && !el.archived).length > 0}
	<Hr>
		<Icon name="pin" class="size-4" />
		{$_('notes.pinned')}
	</Hr>
	<div
		class="grid w-full gap-4 px-2"
		style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
	>
		{#each notes.filter((el) => el.pinned && !el.archived) as note (note.id)}
			<NoteCard {note} />
		{/each}
	</div>

	<Hr />
{/if}

<!-- Normal notes -->
<div
	class="grid w-full gap-4 px-2 pb-[6.5rem]"
	style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
>
	{#each notes.filter((el) => !el.archived && !el.pinned) as note (note.id)}
		<NoteCard {note} />
	{/each}
</div>

<!-- Bottom fixed bar -->
<div
	class="fixed bottom-4 left-1/2 z-30 flex w-full max-w-screen-xl -translate-x-1/2 flex-row items-end justify-between px-4"
>
	{#if notes.filter((note) => note.archived).length > 0}
		<button
			class="z-30 rounded-full bg-gray-light p-2 dark:bg-gray"
			onclick={() => {
				archivedNotesModalOpen = true;
			}}
		>
			<Icon name="archive" />
		</button>
	{:else}
		<span></span>
	{/if}
	<!-- Big red button -->
	<button
		onclick={() => {
			newNoteModalOpen = true;
		}}
		class="flex flex-col items-center justify-center rounded-full bg-red p-4 disabled:bg-gray"
		disabled={$isOffline}
	>
		<Icon name="plus" class="size-10 text-white dark:text-white" />
	</button>

	{#if notes.filter((el) => !el.archived).length > 0}
		<button
			class="z-30 rounded-full bg-gray-light p-2 dark:bg-gray"
			onclick={() => {
				searchNotesModalOpen = true;
			}}
		>
			<Icon name="search" />
		</button>
	{/if}
</div>

{#if notes.filter((el) => !el.archived).length > 0}
	<!-- Archived notes modal -->
	<Modal bind:open={archivedNotesModalOpen} title={$_('notes.modals.archivedNotes.title')}>
		<div class="flex flex-col gap-6 p-1">
			{#each notes.filter((note) => note.archived) as note (note.id)}
				<div class="flex flex-col">
					<NoteCard {note} inactive={true} class="rounded-b-none" />
					<button
						class="flex flex-row gap-2 rounded-b bg-white px-4 py-2 ring-2 dark:bg-black {noteBorderColors.find(
							(el) => el.name === note.color
						)?.class ?? 'ring-0'}"
						onclick={() => unArchiveNote(note)}
						disabled={unArchivingNote === note.id || $isOffline}
					>
						{#if unArchivingNote === note.id}
							<Loader />
						{:else}
							<Icon name="back" class="size-5" />
						{/if}
						{$_('notes.modals.archivedNotes.restore')}
					</button>
				</div>
			{/each}
		</div>
	</Modal>
{/if}

<!-- New note modal -->
<Modal bind:open={newNoteModalOpen} title={$_('notes.modals.newNote.title')}>
	<div class="flex flex-col gap-2">
		<form
			method="POST"
			action="?/createTextualNote"
			use:enhance={() => {
				isCreatingTextNote = true;
				return async ({ update }) => {
					isCreatingTextNote = false;
					update();
				};
			}}
		>
			<Button loading={isCreatingTextNote} type="submit" class="w-full">
				<Icon name="paragraph" />
				{$_('notes.modals.newNote.noteTypes.text')}
			</Button>
		</form>
		<form
			method="POST"
			action="?/createListNote"
			use:enhance={() => {
				isCreatingListNote = true;
				return async ({ update }) => {
					isCreatingListNote = false;
					update();
				};
			}}
		>
			<Button loading={isCreatingListNote} class="w-full">
				<Icon name="list" />
				{$_('notes.modals.newNote.noteTypes.list')}
			</Button>
		</form>
	</div>
</Modal>

<!-- Search modal -->
<Modal bind:open={searchNotesModalOpen} title={$_('notes.modals.search.title')}>
	<Input
		placeholder={$_('notes.modals.search.placeholder')}
		id="search"
		autocomplete="off"
		class="mt-[2px]"
		onkeyup={searchNotes}
	/>
	<div class="mt-2 grid max-h-full gap-4 overflow-y-auto p-1">
		{#each searchNotesMatching as note (note.id)}
			<NoteCard {note} />
		{/each}
	</div>
</Modal>
