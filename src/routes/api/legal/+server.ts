import { legalDataEn, legalDataSl } from '$lib/constants';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const lang = url.searchParams.get('lang');

	switch (lang) {
		case 'en':
			return new Response(JSON.stringify(legalDataEn), {
				headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
			});
		case 'sl':
			return new Response(JSON.stringify(legalDataSl), {
				headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
			});
		default:
			error(404, 'Invalid lang param. Use en or sl.');
	}
};
