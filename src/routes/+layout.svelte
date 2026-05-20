<script lang="ts">
	import '$lib/styles/global.css';
	let { children } = $props();
</script>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased px-6 py-24">
	{@render children()}
</div>