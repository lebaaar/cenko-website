<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Cenko | {page.status}</title>
</svelte:head>

<main class="mx-auto flex max-w-2xl flex-col">
	<h1 class="text-4xl font-bold tracking-tight">{page.status}</h1>
	<p class="mt-2 text-sm text-zinc-400">{page.error?.message ?? 'Something went wrong.'}</p>
	<a href="/" class="mt-8 w-fit text-sm text-zinc-300 underline underline-offset-4 hover:text-white">
		Go home
	</a>
</main>
