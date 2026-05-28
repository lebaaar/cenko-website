import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	subscribe: async ({ request, platform }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: true });
		}

		const webhookUrl = platform?.env?.DISCORD_WEBHOOK_URL;
		if (webhookUrl) {
			await fetch(webhookUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					embeds: [
						{
							title: 'New subscriber',
							description: email,
							color: 0x006760
						}
					]
				})
			});
		}

		return { success: true };
	}
};
