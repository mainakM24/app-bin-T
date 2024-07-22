// src/stores.js
import { readable, writable, type Writable } from 'svelte/store';


export const time = readable(new Date(), (set) => {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});


