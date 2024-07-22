import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    if (!event.locals.user) {
        throw redirect(303, '/login')
    }
    throw redirect(303,'/home')
}