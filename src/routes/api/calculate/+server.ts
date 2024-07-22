import { json } from '@sveltejs/kit';

export const GET = async () => {
	const result = calculateNumber();
	return json({ result });
};

function calculateNumber() {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();
	const day = now.getUTCDate();
	const hours = now.getUTCHours();
	const minutes = now.getUTCMinutes();

	const root = year + month + day + hours + minutes;
    let sq = root * root;
    let digitalRoot = 0;
		while (sq) {
			digitalRoot += sq % 10;
			sq = Math.floor(sq / 10);
		}
	return digitalRoot % 2;
	
}
