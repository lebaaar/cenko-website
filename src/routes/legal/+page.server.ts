import { redirect } from '@sveltejs/kit';
import { getLocale } from '$paraglide/runtime';

export function load() {
	redirect(301, getLocale() === 'sl' ? '/legal/sl' : '/legal/en');
}
