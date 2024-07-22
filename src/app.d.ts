// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase'
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase
			user: any
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
