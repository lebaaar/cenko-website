import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	subscribe: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Enter a valid email address.' });
		}

		// TODO: wire up to email service (Resend, Mailchimp, etc.)
		console.log('New subscriber:', email);

		return { success: true };
	}
};
