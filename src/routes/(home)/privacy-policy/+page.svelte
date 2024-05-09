<script>
	import { _, locale } from 'svelte-i18n';
	import { formatDate } from '$lib/utils';
	import { seo } from '$lib/stores';

	$seo.title = $_('privacy-policy.title');
	$seo.description = $_('privacy-policy.description');
</script>

<header>
	<h1>{ $_('privacy-policy.title') }</h1>
</header>

<section class="mt-4">
	<h2>{ $_('privacy-policy.introduction.title') }</h2>
	<p>{ $_('privacy-policy.introduction.p1') }</p>
</section>

<section class="mt-4">
	<h2>{ $_('privacy-policy.collectedInformation.title') }</h2>
	<p>{ $_('privacy-policy.collectedInformation.p1') }</p>
	<ul>
		<li>{ $_('privacy-policy.collectedInformation.l1.v1') }</li>
		<li>{ $_('privacy-policy.collectedInformation.l1.v2') }</li>
		<li>{ $_('privacy-policy.collectedInformation.l1.v3') }</li>
	</ul>
	<p>{ $_('privacy-policy.collectedInformation.p2') }</p>
</section>

<section class="mt-4">
	<h2>{ $_('privacy-policy.howInformationIsUsed.title') }</h2>
	<p>{ $_('privacy-policy.howInformationIsUsed.p1') }</p>
	<ul>
		<li>{ $_('privacy-policy.howInformationIsUsed.l1.v1') }</li>
		<li>{ $_('privacy-policy.howInformationIsUsed.l1.v2') }</li>
		<li>{ $_('privacy-policy.howInformationIsUsed.l1.v3') }</li>
	</ul>
</section>

<section class="mt-4">
	<h2>{ $_('privacy-policy.informationSharing.title') }</h2>
	<p>{ $_('privacy-policy.informationSharing.p1') }</p>
</section>

<section class="mt-4">
	<h2>{ $_('privacy-policy.dataSecurity.title') }</h2>
	<p>
		{ $_('privacy-policy.dataSecurity.p1') }
	</p>
</section>

<section class="mt-4">
	<h2>{ $_('privacy-policy.contactUs.title') }</h2>
	<p>
		{ $_('privacy-policy.contactUs.p1') } <a
			href="mailto:angus@paillaugue.fr">angus@paillaugue.fr</a
		>.
	</p>>>
</section>

<p class="mt-4">{ $_('privacy-policy.lastUpdated', { values: { date:formatDate(new Date("09 may 2024 14:50"), { locale:$locale, timeStyle:"short" }) }}) }</p>
