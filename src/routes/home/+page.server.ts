import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';




export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	} else {
		
		return {
			balance: locals.user.balance
		};
	}
};

export const actions = {
	bet0: async ({ request, locals }) => {
		const data = await request.formData();
		const amount: number = Number(data.get('amount'));
		const dataObj = {
			email: await locals.user.email,
			side: '0',
			amount: amount
		};

		try {
			const record = await locals.pb.collection('bets').create(dataObj);
			console.log('success');
		} catch (err) {
			console.log('Error: ', err);
		}
	},

	bet1: async ({ request, locals }) => {
		const data = await request.formData();
		const amount: number = Number(data.get('amount'));
		const dataObj = {
			email: await locals.user.email,
			side: '1',
			amount: amount
		};

		try {
			const record = await locals.pb.collection('bets').create(dataObj);
			console.log('success');
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
