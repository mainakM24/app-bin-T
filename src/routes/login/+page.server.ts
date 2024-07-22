import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const email = body.email as string;
		const password = body.password as string;
		console.log(locals.pb.authStore.model);

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			if (!locals.pb?.authStore?.model?.verified) {
				console.log(locals.pb.authStore.model);
				locals.pb.authStore.clear();
				return { notVerified: true };
			}
		} catch (err) {
			console.log('Error:', err);
			return {invalidCred: true}
		}

		throw redirect(303, '/home');
	}
};
