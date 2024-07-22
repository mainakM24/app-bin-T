import { error, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		const email = body.email as string;

		try {
			await locals.pb.collection('users').create({ ...body, balance: 10000 });
			await locals.pb.collection('users').requestVerification(email);
		} catch (err) {
			console.log(err);
			throw error(500, 'Something went wrong, refresh the page.');
		}
		
		throw redirect(303, '/login');
	}
};
