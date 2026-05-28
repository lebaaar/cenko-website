<script lang="ts">
	import '$lib/styles/global.css';
	import logo from '$lib/assets/logo.png';
	import LanguagePicker from '$lib/components/LanguagePicker.svelte';
	import { getLocale, setLocale, locales } from '$paraglide/runtime';
	import * as m from '$paraglide/messages';

	type Locale = Parameters<typeof setLocale>[0];
	const supportedLocales = locales as readonly Locale[];

	let { children } = $props();
	const locale = $derived(getLocale());
	const legalHref = $derived(locale === 'sl' ? '/legal/sl' : '/legal/en');

	let mobileOpen = $state(false);

	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<div class="min-h-screen bg-[#131718] text-[#E4E8E8] font-sans antialiased overflow-x-hidden flex flex-col">
	<nav class="sticky top-0 z-50 border-b border-[#737A7A]/20 bg-[#131718]/90 backdrop-blur-sm px-6">
		<div class="mx-auto max-w-5xl h-14 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2.5">
				<img src={logo} alt="Cenko" width="28" height="28" class="rounded-lg" />
				<span class="text-[#E4E8E8] font-bold text-lg tracking-tight">Cenko</span>
			</a>

			<!-- Desktop nav -->
			<div class="hidden sm:flex items-center gap-4 text-sm text-[#8A9291]">
				<a href="https://github.com/lebaaar/cenko" target="_blank" class="hover:text-[#E4E8E8] transition-colors">GitHub</a>
				<a href={legalHref} class="hover:text-[#E4E8E8] transition-colors">{m.nav_legal()}</a>
				<LanguagePicker />
			</div>

			<button
				class="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-[#2E3435] bg-[#1A1F20] text-[#8A9291] transition-colors hover:border-[#006760] hover:text-[#E4E8E8]"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				{/if}
			</button>
		</div>

		{#if mobileOpen}
			<div class="sm:hidden border-t border-[#737A7A]/20 py-4 flex flex-col gap-4 text-sm text-[#8A9291]">
				<a href="https://github.com/lebaaar/cenko" target="_blank" class="hover:text-[#E4E8E8] transition-colors" onclick={() => (mobileOpen = false)}>GitHub</a>
				<a href={legalHref} class="hover:text-[#E4E8E8] transition-colors" onclick={() => (mobileOpen = false)}>{m.nav_legal()}</a>
				<div class="flex gap-2">
					{#each supportedLocales as lang (lang)}
						<button
							onclick={() => { setLocale(lang); mobileOpen = false; }}
							class={`h-9 px-3 rounded-lg border text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
								locale === lang
									? 'border-[#006760] bg-[#006760] text-white'
									: 'border-[#2E3435] bg-[#1A1F20] text-[#8A9291] hover:border-[#006760] hover:text-[#E4E8E8]'
							}`}
						>
							{lang}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</nav>

	<div class="px-6 flex-1">
		{@render children()}
	</div>
</div>
