<script lang="ts">
	import { enhance } from '$app/forms';
	import eurospin from '$lib/assets/stores/eurospin.png';
	import hofer from '$lib/assets/stores/hofer.png';
	import lidl from '$lib/assets/stores/lidl.png';
	import mercator from '$lib/assets/stores/mercator.webp';
	import spar from '$lib/assets/stores/spar.png';
	import tusDrogerija from '$lib/assets/stores/tus-drogerija.jpg';
	import tus from '$lib/assets/stores/tus.png';
	import logo from '$lib/assets/logo.png';
	import * as m from '$paraglide/messages';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let registered = $state(false);

	$effect(() => {
		if (localStorage.getItem('registered')) registered = true;
	});

	$effect(() => {
		if (form?.success) {
			localStorage.setItem('registered', '1');
			registered = true;
		}
	});

	const stores = [
		{ name: 'Mercator', logo: mercator, zoom: 1.3 },
		{ name: 'Spar', logo: spar, zoom: 1.3 },
		{ name: 'Hofer', logo: hofer, zoom: 1.2 },
		{ name: 'Lidl', logo: lidl, zoom: 1 },
		{ name: 'Tuš', logo: tus, zoom: 1 },
		{ name: 'Tuš drogerija', logo: tusDrogerija, zoom: 1 },
		{ name: 'Eurospin', logo: eurospin, zoom: 1 }
	];

	const cx = 250, cy = 258, r = 158;

	const positions = stores.map((store, i) => {
		const angleRad = (-90 + i * (360 / stores.length)) * (Math.PI / 180);
		return {
			...store,
			x: cx + r * Math.cos(angleRad),
			y: cy + r * Math.sin(angleRad),
			above: Math.sin(angleRad) < 0
		};
	});
</script>

<section class="mx-auto max-w-5xl pt-8 pb-10 lg:pt-14 lg:pb-20">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

		<div class="text-center lg:text-left">
			<h1 class="text-6xl sm:text-8xl lg:text-8xl font-extrabold tracking-tight text-[#E4E8E8] mb-3 lg:mb-4 leading-none">
				Cenko
			</h1>
			<p class="text-2xl sm:text-4xl lg:text-4xl font-bold text-[#E4E8E8] mb-5 lg:mb-6 leading-tight">
				{m.tagline_1()}<br />{m.tagline_2()}<br />{m.tagline_3()}
			</p>
			<p class="text-base text-[#8A9291] mb-8 leading-relaxed max-w-sm mx-auto lg:mx-0">
				{m.description()}
			</p>
			{#if registered}
				<p class="text-sm text-[#7CD0C6] font-medium">
					{m.registered_msg()}
				</p>
			{:else}
				<form
					method="POST"
					action="?/subscribe"
					use:enhance
					class="flex flex-col gap-2 max-w-sm mx-auto lg:mx-0"
				>
					<div class="flex gap-2">
						<input
							type="email"
							name="email"
							placeholder={m.email_placeholder()}
							required
							class="flex-1 min-w-0 rounded-lg bg-[#1A1F20] border border-[#2E3435] text-[#E4E8E8] placeholder-[#4A5151] px-4 py-2.5 text-sm focus:outline-none focus:border-[#006760] transition-colors"
						/>
						<button
							type="submit"
							class="rounded-lg bg-[#006760] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#005A54] transition-colors whitespace-nowrap"
						>
							{m.get_notified()}
						</button>
					</div>
					{#if form?.error}
						<p class="text-xs text-[#FFB4AB]">{m.error_invalid_email()}</p>
					{:else}
						<p class="text-xs text-[#737A7A]">{m.get_notified_hint()}</p>
					{/if}
				</form>
			{/if}
		</div>

		<div class="w-full px-4 lg:px-0">
			<svg viewBox="47 35 405 430" class="block w-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					{#each positions as pos, i}
						<linearGradient
							id="lg-{i}"
							x1={cx}
							y1={cy}
							x2={pos.x}
							y2={pos.y}
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0.1" stop-color="#006760" stop-opacity="0.8" />
							<stop offset="1" stop-color="#006760" stop-opacity="0.15" />
						</linearGradient>
						<clipPath id="sc-{i}">
							<rect x={pos.x - 30} y={pos.y - 30} width="60" height="60" rx="15" />
						</clipPath>
					{/each}
					<clipPath id="cc">
						<rect x={cx - 48} y={cy - 48} width="96" height="96" rx="24" />
					</clipPath>
				</defs>

				{#each positions as pos, i}
					<line
						x1={cx}
						y1={cy}
						x2={pos.x}
						y2={pos.y}
						stroke="url(#lg-{i})"
						stroke-width="1.5"
						stroke-dasharray="5 4"
					/>
				{/each}

				{#each positions as pos, i}
					<image
						href={pos.logo}
						x={pos.x - 30 * pos.zoom}
						y={pos.y - 30 * pos.zoom}
						width={60 * pos.zoom}
						height={60 * pos.zoom}
						preserveAspectRatio="xMidYMid meet"
						clip-path="url(#sc-{i})"
					/>
				{/each}

				<image
					href={logo}
					x={cx - 48}
					y={cy - 48}
					width="96"
					height="96"
					clip-path="url(#cc)"
					preserveAspectRatio="xMidYMid meet"
				/>
				<rect
					x={cx - 50}
					y={cy - 50}
					width="100"
					height="100"
					rx="26"
					fill="none"
					stroke="#006760"
					stroke-width="1.5"
					opacity="0.5"
				/>
				<text
					x={cx}
					y={cy + 70}
					text-anchor="middle"
					fill="#E4E8E8"
					font-size="14"
					font-family="Manrope, sans-serif"
					font-weight="700"
				>Cenko</text>
			</svg>
		</div>
	</div>
</section>
