<script lang="ts">
	import '$lib/styles/global.css';
	import logo from '$lib/assets/logo.png';
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#131718] text-[#E4E8E8] font-sans antialiased overflow-x-hidden flex flex-col">
	<nav class="sticky top-0 z-50 border-b border-[#737A7A]/20 bg-[#131718]/90 backdrop-blur-sm px-6">
		<div class="mx-auto max-w-5xl h-14 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2.5">
				<img src={logo} alt="Cenko" width="28" height="28" class="rounded-lg" />
				<span class="text-[#E4E8E8] font-bold text-lg tracking-tight">Cenko</span>
			</a>
			<div class="flex items-center gap-6 text-sm text-[#8A9291]">
				<a href="https://github.com/lebaaar/cenko" target="_blank" class="hover:text-[#E4E8E8] transition-colors">GitHub</a>
				<a href="/legal" class="hover:text-[#E4E8E8] transition-colors">Legal</a>
			</div>
		</div>
	</nav>

	<div class="px-6 flex-1">
		{@render children()}
	</div>
</div>
