<script>
	import { Icon } from '$lib/components';
</script>

<!-- Navbar -->
<nav class="bg-black h-14 flex flex-row gap-2 items-center mb-6">
	<!-- Go back button -->
	<button onclick={() => window.history.back()} class="p-2">
		<Icon name="back" />
	</button>
</nav>

<slot />
