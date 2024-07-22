import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	//getting the request data
	let win: boolean | null;
	const data = await event.request.json();
	const choice = data.choice;
	const amount = data.betAmount;
	let newBalance: number;
	let bal;
	let profit: number = 0;

	// fetching result
	const response = await event.fetch('/api/calculate');
	const responseData = await response.json();
	const result = responseData.result;

	//getting result from pocketbase
	const userDetail = await event.locals.pb.collection('users').getOne(event.locals.user.id);
	newBalance = userDetail.balance;
	bal = userDetail.balance;

	//checking for win
	if (choice == null) {
		win = null;
	} else {
		win = choice == result;
	}

	if (win) {
		//updating balance
		newBalance = bal + amount * 0.8;
		newBalance = parseFloat(newBalance.toFixed(2));
		const updateBalance = await event.locals.pb
			.collection('users')
			.update(event.locals.user.id, { balance: newBalance });
		
		//updating profit data
		const records = await event.locals.pb.collection('bets').getList(1, 1, {
			filter: `email="${event.locals.user.email}"`,
			sort: '-created'
		});
		const lastRecord = records.items[0];
		profit = amount * 0.8;
		const updateProfit = await event.locals.pb
			.collection('bets')
			.update(lastRecord.id, { profit: amount * 0.8 });
	}
	else if (win == false) {
		//updating balance
		newBalance = bal - amount;
		newBalance = parseFloat(newBalance.toFixed(2));
		const updateBalance = await event.locals.pb
			.collection('users')
			.update(event.locals.user.id, { balance: newBalance });
		
		//updating profit data
		const records = await event.locals.pb.collection('bets').getList(1, 1, {
			filter: `email="${event.locals.user.email}"`,
			sort: '-created'
		});
		const lastRecord = records.items[0];
		profit = amount;
		const updateProfit = await event.locals.pb
			.collection('bets')
			.update(lastRecord.id, { profit: -amount });
	}

	return json({ win, newBalance, profit });
};
