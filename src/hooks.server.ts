import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
	// event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	// event.locals.pb = new PocketBase('https://pb-database.fly.dev/');
	event.locals.pb = new PocketBase('https://bin-t.pockethost.io/');

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	event.locals.user = event.locals.pb.authStore.isValid ? event.locals.pb.authStore.model : null;

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
