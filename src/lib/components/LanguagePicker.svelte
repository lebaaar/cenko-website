<script lang="ts">
	import { onMount } from 'svelte';
	import { getLocale, setLocale, locales } from '$paraglide/runtime';

	type Locale = Parameters<typeof setLocale>[0];

	const locale = $derived(getLocale());
	const supportedLocales = locales as readonly Locale[];

	let open = $state(false);
	let menuRoot: HTMLDivElement | null = null;

	function selectLocale(lang: Locale) {
		setLocale(lang);
		open = false;
	}

	onMount(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (menuRoot && !menuRoot.contains(event.target as Node)) {
				open = false;
			}
		};
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') open = false;
		};
		document.addEventListener('click', handleDocumentClick);
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div bind:this={menuRoot} class="relative">
	<button
		onclick={() => (open = !open)}
		aria-label={`Change language, current ${locale.toUpperCase()}`}
		aria-haspopup="menu"
		aria-expanded={open}
		class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#2E3435] bg-[#1A1F20] text-[#8A9291] transition-colors hover:border-[#006760] hover:text-[#E4E8E8]"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M2 12h20"></path>
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
		</svg>
	</button>

	{#if open}
		<div
			role="menu"
			class="absolute right-0 mt-1 flex w-20 flex-col gap-0.5 overflow-hidden rounded-lg border border-[#2E3435] bg-[#131718] p-1 shadow-xl"
		>
			{#each supportedLocales as lang (lang)}
				<button
					onclick={() => selectLocale(lang)}
					role="menuitemradio"
					aria-checked={locale === lang}
					class={`w-full cursor-pointer rounded px-2 py-1.5 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
						locale === lang
							? 'bg-[#006760] text-white'
							: 'text-[#8A9291] hover:bg-[#1A1F20] hover:text-[#E4E8E8]'
					}`}
				>
					{lang}
				</button>
			{/each}
		</div>
	{/if}
</div>
