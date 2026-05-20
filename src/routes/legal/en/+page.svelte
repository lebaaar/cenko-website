<script lang="ts">
	import { CONTACT_EMAIL, LAST_UPDATED, legalDataEn } from '$lib/constants';
</script>

<svelte:head>
	<title>Cenko | Legal</title>
</svelte:head>

<main class="mx-auto max-w-2xl">
	<h1 class="text-3xl font-bold">Legal Information</h1>
	<p class="mb-12 text-sm text-zinc-400">Last updated: {LAST_UPDATED}</p>

	{#each legalDataEn.sections as section (section.id)}
		<section class="mb-8">
			<h2 class="mb-3 text-lg font-semibold">{section.title}</h2>
			<ul class="space-y-2">
				{#each section.bullets as bullet (section.id + bullet)}
					<li class="flex gap-3 text-sm text-zinc-300">
						<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400"></span>
						<span>{bullet}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	<h2 class="mb-2 text-lg font-semibold">Questions?</h2>
	<a href="mailto:{CONTACT_EMAIL}" class="text-sm text-zinc-300 underline underline-offset-2">
		{CONTACT_EMAIL}
	</a>
</main>
