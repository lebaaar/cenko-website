import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	subscribe: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email')?.toString().trim();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: true });
		}

		const webhookUrl =
			event.platform?.env?.DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;

		if (!webhookUrl) {
			console.error('DISCORD_WEBHOOK_URL is not set. Skipping Discord notification.');
		} else {
			try {
				const res = await fetch(webhookUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						embeds: [
							{
								title: 'New subscriber',
								description: email,
								color: 0x006760,
								timestamp: new Date().toISOString()
							}
						]
					})
				});
				if (!res.ok) {
					console.error('Discord webhook failed:', res.status, await res.text());
				}
			} catch (err) {
				console.error('Discord webhook error:', err);
			}
		}

		return { success: true };
	}
};
