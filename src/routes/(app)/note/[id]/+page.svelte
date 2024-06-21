<script>
	import { onMount } from 'svelte';
	import { Checkbox, Modal, Hr, Button, Icon, Error, ListInput, Tooltip, Tag, Input } from '$lib/components';
	import { formatDate } from '$lib/utils';
	import { noteBgColors } from '$lib/constants';
	import { _, locale } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';
	import { seo } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const { data, form } = $props();
	const { id, note, isOwner } = data;
	const debounceTimer = 500;

	let timers = $state([]);
	let textarea = $state();
	let noteStatus = $state('saved');
	let isDeletingNote = $state(false);
	let isArchivingNote = $state(false);
	let isChangingPin = $state(false);
	let isDuplicatingNote = $state(false);
	let isChangingVisibility = $state(false);
	let noteCopied = $state(false);
	// Modals
	let settingsModalOpen = $state(false);
	let changeNoteColorModalOpen = $state(false);
	let archiveNoteModalOpen = $state(false);
	let deleteNoteModalOpen = $state(false);
	let shareModalOpen = $state(false);
	let tagsModalOpen = $state(false);
	let canVibrate = $state(false);

	$seo.description = 'pageDescriptions.note';

	onMount(() => {
		$seo.title = note.title;

		// Note title focus if note is empty
		if (note.title === '' && (note.content === '' || note.items.length === 0) && isOwner) {
			document.querySelector('input[name="title"]').focus();
		}

		// Vibration
		canVibrate = window.navigator.vibrate;

		// Swipe
		if (!isOwner) return;
		const elements = document.getElementsByClassName('swipable');

		for (const el of elements) {
			listenToSwipe(el);
		}
	});

	$effect(() => {
		if(!note.items) return;
		// ! Do not remove this console.log or else the dependency will not be detected by Svelte
		console.log(note.items)
		for(const item of note.items) {
			const el = document.querySelector(`[data-id="${item.id}"]`);
			listenToSwipe(el);
		}
	});

	/**
	 * Listens to swipe events on the specified element.
	 *
	 * @param {HTMLElement} el - The element to listen for swipe events on.
	*/
	function listenToSwipe(el) {
		if(el.classList.contains('listener')) return;
		const MOVE_THRESHOLD = (window.innerWidth / 5) * 3;
		let initialX;
		let moveX = 0;

		el.addEventListener('touchstart', (e) => {
			initialX = e.touches[0].pageX;
			el.style.transition = 'none';
		});

		el.addEventListener('touchmove', (e) => {
			let currentX = e.touches[0].pageX;
			moveX = currentX - initialX;

			// Only allow left swipe if not already swiped to the left
			if (moveX < 0 || parseFloat(el.style.transform) < 0) {
				el.style.transform = `translateX(${moveX}px)`;
			}
		});

		el.addEventListener('touchend', () => {
			el.style.transition = 'transform 0.3s ease';

			if (moveX < -MOVE_THRESHOLD) {
				// Delete the item from the note
				note.items = note.items.filter((item) => item.id !== el.dataset.id);
				saveNote();
				if(canVibrate)
					navigator.vibrate(200);
			} else {
				// Swipes back to the initial position and hides the delete button
				el.style.transform = `translateX(0px)`;
			}
		});

		el.classList.add('listener');
	}

	/**
	 * Function to hide all modals.
	 */
	const hideAllModals = () => {
		settingsModalOpen = false;
		changeNoteColorModalOpen = false;
		archiveNoteModalOpen = false;
		deleteNoteModalOpen = false;
		shareModalOpen = false;
		tagsModalOpen = false;
	};

	// Hides all the modals
	afterNavigate(hideAllModals);

	/**
	 * Saves the note asynchronously.
	 */
	async function saveNote() {
		if (!isOwner) return;
		noteStatus = 'saving';
		const res = await fetch(`/api/${note.type === 'text' ? 'saveTextNote' : 'saveListNote'}`, {
			method: 'POST',
			body: JSON.stringify({ ...note, id })
		});

		if (res.ok) {
			noteStatus = 'saved';
			note.lastModified = new Date();
		} else {
			console.log(res);
			noteStatus = 'error';
		}

		$seo.title = note.title;
	}

	/**
	 * Debounces the given function.
	 *
	 * @param {Function} fn - The function to debounce.
	 * @returns {Function} - The debounced function.
	 */
	const debounce = (i) => {
		if (!isOwner) return;
		if (i >= timers.length) timers = [...timers, 0];

		clearTimeout(timers[i]);
		timers[i] = setTimeout(() => {
			saveNote();
		}, debounceTimer);
	};

	/**
	 * Adds an item to the list.
	 */
	const addItemToList = async () => {
		if (!isOwner) return;
		const id = crypto.randomUUID();
		note.items.push({ content: '', checked: false, id });
		await saveNote();
		const newItem = document.querySelector(`[data-id="${id}"]`);
		listenToSwipe(newItem);
		newItem.querySelector('input').focus();
	};

	/**
	 * Changes the color of the note.
	 *
	 * @param {string} color - The new color for the note.
	 */
	const changeNoteColor = (color) => {
		if (!isOwner) return;
		note.color = color;
		saveNote();
	};

	/**
	 * Archives the note.
	 *
	 * @returns {Promise<void>} A promise that resolves when the note is successfully archived.
	 */
	const archiveNote = async () => {
		if (!isOwner) return;
		isArchivingNote = true;
		note.archived = true;
		await saveNote();
		isArchivingNote = false;
		window.location.href = '/note';
	};

	/**
	 * Toggles the pin status of the note.
	 *
	 * @returns {Promise<void>} A promise that resolves when the pin status is toggled.
	 */
	const togglePin = async () => {
		if (!isOwner) return;
		isChangingPin = true;
		note.pinned = !note.pinned;
		await saveNote();
		isChangingPin = false;
	};

	/**
	 * Changes the visibility of the note.
	 * @returns {Promise<void>}
	 */
	const changeNoteVisibility = async () => {
		if (!isOwner) return;
		isChangingVisibility = true;
		note.public = !note.public;
		await saveNote();

		isChangingVisibility = false;
	};

	/**
	 * Copies the link to the current page.
	 * @returns {Promise<void>}
	 */
	const copyLink = async () => {
		if (!isOwner) return;
		if ('share' in navigator) {
			navigator.share({
				title: note.title,
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
		}
		noteCopied = true;
		setTimeout(() => {
			noteCopied = false;
		}, 2000);
	};

	/**
	 * Handles the input event for adding a tag.
	 *
	 * @param {Event} e - The input event object.
	*/
	function addTagInputHandler(e) {
		const value = e.target.value.trim();
		const keyCodePressed = e.code;
		if((keyCodePressed === 'Enter' || keyCodePressed === 'Space') && value !== '' && !note.tags.includes(value)) {
			note.tags.push(value);
			e.target.value = '';
			e.preventDefault();
			saveNote();
		}
	}

	/**
	 * Handles the event when a tag is deleted.
	 *
	 * @param {Object} detail - The event detail object.
	 * @param {string} detail.name - The name of the deleted tag.
	*/
	function tagDeleted({ detail:{ name } }) {
		note.tags = note.tags.filter(tag => tag !== name);
		saveNote();
	}
</script>

<main class="flex flex-col" style="height: 100vh;">
	<!-- Navbar -->
	<nav class="bg-black h-14 flex flex-row gap-2 items-center justify-between mb-6">
		<!-- Go back button -->
		<a href="/note" class="p-2">
			<Icon name="back" />
		</a>

		<!-- Open settings button -->
		{#if isOwner}
			<button
				class="rounded-full p-2"
				onclick={() => {
					settingsModalOpen = true;
				}}
			>
				<Icon name="Settings" />
			</button>
		{/if}
	</nav>

	<!-- Main note elements -->
	<div class="p-2 flex flex-col gap-4 grow overflow-y-auto">
		<!-- Note title input -->
		<textarea
			type="text"
			name="title"
			bind:value={note.title}
			onkeyup={() => debounce(0)}
			class="bg-black text-3xl w-full placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot break-words"
			placeholder={$_('note.placeholders.title')}
			readonly={!isOwner}
		></textarea>

		<!-- Text note content -->
		{#if note.type === 'text'}
			<!-- Main text note textarea -->
			<textarea
				name="content"
				bind:value={note.content}
				bind:this={textarea}
				onkeyup={() => debounce(1)}
				class="bg-black text-base tracking-normal w-full rounded resize-none placeholder:text-white focus:outline-none font-base placeholder-shown:font-dot grow"
				placeholder={$_('note.placeholders.content')}
				readonly={!isOwner}
			></textarea>
		{:else}
			<!-- List note unchecked items -->
			<div class="grow flex flex-col gap-4 overflow-y-auto">
				{#each note.items as item, i (item.id)}
					{#if !item.checked}
						<div class="flex flex-row gap-2 items-center swipable" data-id={item.id}>
							<Checkbox
								bind:checked={item.checked}
								on:change={saveNote}
								disabled={!isOwner}
								class="shrink-0"
							/>
							<ListInput
								placeholder="note.placeholders.content"
								readonly={!isOwner}
								bind:value={item.content}
								onkeyup={() => debounce(2 + i)}
							/>
							{#if isOwner}
								<button
									class="transition-all hover:text-red shrink-0 hidden md:block"
									onclick={() => {
										note.items.splice(i, 1);
										saveNote();
									}}
								>
									<Icon name="trash" />
								</button>
							{/if}
						</div>
					{/if}
				{/each}

				<!-- Add line to list note -->
				<button
					onclick={addItemToList}
					class="flex flex-row gap-2 p-2 rounded hover:bg-gray transition-all"
				>
					<Icon name="plus" />
					{$_('note.addItem')}
				</button>

				<!-- Checked list note items -->
				{#if note.items.filter((el) => el.checked).length > 0}
					<!-- Separator -->
					<Hr>
						<Icon name="check" class="size-4" />
						{$_('note.checkedItems')}
					</Hr>
					{#each note.items as item, i (item.id)}
						{#if item.checked}
							<div class="flex flex-row gap-2 items-center swipable" data-id={item.id}>
								<Checkbox
									bind:checked={item.checked}
									on:change={saveNote}
									disabled={!isOwner}
									class="shrink-0"
								/>
								<ListInput
									placeholder="note.placeholders.content"
									readonly={!isOwner}
									bind:value={item.content}
									onkeyup={() => debounce(2 + note.items.length + i)}
								/>
								{#if isOwner}
									<button
										class="transition-all hover:text-red shrink-0 hidden md:block"
										onclick={() => {
											note.items.splice(i, 1);
											saveNote();
										}}
									>
										<Icon name="trash" />
									</button>
								{/if}
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		{/if}
	</div>

	<!-- Bottom bar -->
	<div
		class="flex flex-row gap-2 items-center {isOwner
			? 'justify-between'
			: 'justify-center'} h-14 px-2 bg-black"
	>
		<!-- Note owner username -->
		{#if !isOwner}
			<p class="text-center font-dot">{note.owner}</p>
		{/if}

		<!-- Change note color button -->
		{#if isOwner}
			<button
				class="p-2 rounded-full {noteBgColors.find((el) => el.name === note.color)?.class ?? ''}"
				onclick={() => {
					changeNoteColorModalOpen = true;
				}}
			>
				<Icon name="palette" class={note.color === 'white' && 'text-gray'} />
			</button>
		{:else}
			<div></div>
		{/if}

		<!-- Last saved tile and date -->
		{#if isOwner}
			<div class="grow flex flex-row h-full items-center justify-center">
				<p class="text-base font-dot">{formatDate(note.lastModified, { locale: $locale })}</p>
			</div>
		{/if}

		<!-- Save status -->
		{#if isOwner}
			<Tooltip content={$_(`note.statuses.${noteStatus}`)}>
				{#if noteStatus === 'saved'}
					<Icon name="cloud" />
				{:else if noteStatus === 'saving'}
					<Icon name="refresh" />
				{:else}
					<Icon name="warning" />
				{/if}
			</Tooltip>
		{/if}
	</div>
</main>

<!-- Share note modal -->
<Modal bind:open={shareModalOpen} title={$_('note.modals.share.title')}>
	{#if note.public}
		<p>{$_('note.modals.share.makeItPrivateDisclaimer')}</p>
	{:else}
		<p>{$_('note.modals.share.makeItPublicDisclaimer')}</p>
	{/if}
	{#if note.public}
		<Button center onclick={copyLink} class="my-4 w-full">
			{#if 'share' in navigator}
				<Icon name="share" />
				{$_('note.modals.share.title')}
			{:else if noteCopied}
				<Icon name="check" />
				{$_('note.modals.share.linkCopied')}
			{:else}
				<Icon name="clipboard" />
				{$_('note.modals.share.copyLink')}
			{/if}
		</Button>
	{/if}
	<div class="grid grid-cols-2 gap-2 w-full mt-2">
		<Button
			center
			onclick={() => {
				hideAllModals();
				settingsModalOpen = true;
			}}
		>
			{$_('note.modals.share.cancel')}
		</Button>
		<Button center loading={isChangingVisibility} onclick={changeNoteVisibility}>
			{#if note.public}
				{$_('note.modals.share.makeItPrivate')}
			{:else}
				{$_('note.modals.share.makeItPublic')}
			{/if}
		</Button>
	</div>
</Modal>

<!-- Archive note modal -->
<Modal bind:open={archiveNoteModalOpen} title={$_('note.modals.archive.title')}>
	<p>{$_('note.modals.archive.message')}</p>
	<div class="grid grid-cols-2 gap-2 w-full mt-2">
		<Button
			center
			disabled={isArchivingNote}
			onclick={() => {
				hideAllModals();
				settingsModalOpen = true;
			}}
		>
			{$_('note.modals.archive.cancel')}
		</Button>
		<Button center loading={isArchivingNote} disabled={isArchivingNote} onclick={archiveNote}>
			{$_('note.modals.archive.confirm')}
		</Button>
	</div>
</Modal>

<!-- Delete note confirm modal -->
<Modal bind:open={deleteNoteModalOpen} title={$_('note.modals.delete.title')}>
	<p>{$_('note.modals.delete.message')}</p>
	{#if form?.error && form?.action === 'deleteNote'}
		<Error message={form.error} class="bg-gray p-4" />
	{/if}
	<form
		action="?/deleteNote"
		method="POST"
		class="grid grid-cols-2 gap-2 w-full mt-2"
		use:enhance={() => {
			isDeletingNote = true;
			return async ({ update }) => {
				isDeletingNote = false;
				update();
			};
		}}
	>
		<Button
			center
			disabled={isDeletingNote}
			type="button"
			onclick={() => {
				hideAllModals();
				settingsModalOpen = true;
			}}
		>
			{$_('note.modals.delete.cancel')}
		</Button>
		<Button center loading={isDeletingNote} disabled={isDeletingNote} type="submit">
			{$_('note.modals.delete.confirm')}
		</Button>
	</form>
</Modal>

<!-- Change note color modal -->
<Modal bind:open={changeNoteColorModalOpen} title={$_('note.modals.noteColor.title')}>
	<div class="flex flex-row gap-4 w-full mt-2">
		<button
			class="rounded-full size-10 ring-4 bg-black {note.color === 'black'
				? 'ring-white'
				: 'ring-gray'}"
			onclick={() => {
				changeNoteColor('black');
			}}
		></button>
		<button
			class="rounded-full size-10 ring-4 bg-red {note.color === 'red' ? 'ring-white' : 'ring-gray'}"
			onclick={() => {
				changeNoteColor('red');
			}}
		></button>
		<button
			class="rounded-full size-10 ring-4 bg-white {note.color === 'white'
				? 'ring-black'
				: 'ring-gray'}"
			onclick={() => {
				changeNoteColor('white');
			}}
		></button>
		<button
			class="rounded-full size-10 ring-4 bg-blue {note.color === 'blue'
				? 'ring-white'
				: 'ring-gray'}"
			onclick={() => {
				changeNoteColor('blue');
			}}
		></button>
	</div>
</Modal>

<!-- Archive note modal -->
<Modal bind:open={tagsModalOpen} title={$_('note.modals.tags.title')}>
	{#if note.tags.length > 0}
		<div class="flex flex-row gap-2 flex-wrap mb-2">
			{#each note.tags as tag (tag)}
				<div transition:scale={{ duration: 300, opacity: 0.5, start: 0.5, easing: quintOut }}>
					<Tag name={tag} removable={true} on:delete={tagDeleted} />
				</div>
			{/each}
		</div>
	{/if}

	<Input name="tagsInput" autocomplete="off" placeholder="Add tags" onkeydown={addTagInputHandler} />
</Modal>

<!-- Settings modal -->
<Modal bind:open={settingsModalOpen} title={$_('note.modals.settings.title')}>
	<div class="flex flex-col w-full gap-2">

		<!-- Pin/Unpin note -->
		<Button loading={isChangingPin} onclick={togglePin}>
			{#if note.pinned}
				<Icon name="pin-filled" />
			{:else}
				<Icon name="pin" />
			{/if}
			{note.pinned ? $_('note.modals.settings.unpin') : $_('note.modals.settings.pin')}
		</Button>

		<!-- Pin/Unpin note -->
		<Button onclick={() => {modal;tagsModalOpen = true}}>
			<Icon name="tag" />
			{$_('note.modals.tags.title')}
		</Button>

		<!-- Share note -->
		<Button
			onclick={() => {
				hideAllModals();
				shareModalOpen = true;
			}}
		>
			<Icon name="share" />
			{$_('note.modals.share.share')}
		</Button>

		<!-- Duplicate note button -->
		{#if form?.error && form?.action === 'duplicateNote'}
			<Error message={form.error} class="bg-gray p-4 pr-8">
				<Button
					onclick={() => {
						location.reload();
					}}
					center
					class="bg-black w-full"
				>
					{$_('note.modals.settings.refresh')}
				</Button>
			</Error>
		{:else}
			<form
				action="?/duplicateNote"
				method="POST"
				class="w-full"
				use:enhance={() => {
					isDuplicatingNote = true;
					return async ({ update }) => {
						isDuplicatingNote = false;
						update();
					};
				}}
			>
				<Button disabled={isDuplicatingNote} loading={isDuplicatingNote} class="w-full">
					<Icon name="duplicate" />
					{$_('note.modals.settings.duplicate')}
				</Button>
			</form>
		{/if}

		<!-- Archive note button -->
		<Button
			onclick={() => {
				hideAllModals();
				archiveNoteModalOpen = true;
			}}
		>
			<Icon name="archive-add" />
			{$_('note.modals.settings.archive')}
		</Button>

		<!-- delete note button -->
		<Button
			onclick={() => {
				hideAllModals();
				deleteNoteModalOpen = true;
			}}
		>
			<Icon name="trash" class="size-5" />
			{$_('note.modals.settings.delete')}
		</Button>
	</div>
</Modal>
