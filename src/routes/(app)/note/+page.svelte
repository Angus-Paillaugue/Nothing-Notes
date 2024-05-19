<script>
	import { Modal, Hr, NoteCard, Loader, Button, Icon } from '$lib/components';
	import { noteBorderColors } from '$lib/constants';
	import { _ } from 'svelte-i18n';
	import { seo, isOffline } from '$lib/stores';
	import { enhance } from '$app/forms';
	// import { longPress } from './longPress';

	const { data } = $props();

	let notes = $state(data.notes);
	let newNoteModalOpen = $state(false);
	let archivedNotesModalOpen = $state(false);
	let unArchivingNote = $state(undefined);
	let isCreatingTextNote = $state(false);
	let isCreatingListNote = $state(false);

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
</script>

<svelte:head>
	<title>{$_('notes.title')}</title>
</svelte:head>

<!-- Navbar -->
<nav
	class="fixed top-0 left-0 right-0 z-40 max-w-screen-lg mx-auto bg-black flex flex-row gap-2 items-center justify-between h-14"
>
	<div class="p-2">
		<div class="size-6"></div>
	</div>
	<a href="/note">
		<h1>Notes</h1>
	</a>
	<a class="p-2" href="/account">
		<Icon name="account" />
	</a>
</nav>

<!-- Spacer -->
<div class="h-24"></div>

{#if notes.filter((el) => !el.archived).length === 0}
	<h2>{$_('notes.noNotes')}</h2>
{/if}

{#if notes.filter((el) => el.pinned && !el.archived).length > 0}
	<Hr>
		<Icon name="pin" class="size-4" />
		{$_('notes.pinned')}
	</Hr>
	<div
		class="grid gap-4 w-full px-2"
		style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
	>
		{#each notes.filter((el) => el.pinned && !el.archived) as note (note.id)}
			<NoteCard {note} />
		{/each}
	</div>

	<Hr />
{/if}

<div
	class="grid gap-4 w-full px-2 pb-[6.5rem]"
	style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
>
	{#each notes.filter((el) => !el.archived && !el.pinned) as note (note.id)}
		<NoteCard {note} />
	{/each}
</div>

<!-- Big red button -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2">
	<button
		onclick={() => {
			newNoteModalOpen = true;
		}}
		class="rounded-full bg-red disabled:bg-gray p-4 flex flex-col items-center justify-center"
		disabled={$isOffline}
	>
		<Icon name="plus" class="size-10" />
	</button>
</div>

<!-- Archived notes -->
{#if notes.filter((note) => note.archived).length > 0}
	<button
		class="fixed bottom-4 right-4 rounded-full bg-gray p-2"
		onclick={() => {
			archivedNotesModalOpen = true;
		}}
	>
		<Icon name="archive" />
	</button>

	<!-- Archived notes modal -->
	<Modal bind:open={archivedNotesModalOpen} title={$_('notes.modals.archivedNotes.title')}>
		<div class="flex flex-col gap-6 p-1">
			{#each notes.filter((note) => note.archived) as note (note.id)}
				<div class="flex flex-col">
					<NoteCard {note} inactive={true} class="rounded-b-none" />
					<button
						class="rounded-b ring-2 flex flex-row gap-2 px-4 py-2 bg-black -mt-[2x] {noteBorderColors.find(
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
