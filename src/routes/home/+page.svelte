<script lang="ts">
	import Choice from '$lib/components/ui/choice/choice.svelte';
	import WinResult from '$lib/components/ui/result/winResult.svelte';
	import RoundResult from '$lib/components/ui/result/roundResult.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Clock from '$lib/components/ui/clock/Clock.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';
	import { enhance } from '$app/forms';
	import { time as t } from '$lib/stores.js';

	//variable declaration
	let time: Date = new Date();
	let result: number;
	let betAmount: number = 1;
	let choice: any = null;
	let profit: number;
	let balance: number;
	let won: boolean | null = null;
	export let data;

	//subscribing to stores
	t.subscribe((value) => {
		time = value;
	});

	//for fetching the result and updating the time
	async function updateData() {
		const response = await fetch('/api/calculate');
		const data = await response.json();
		result = data.result;

		//updating the choice and result
		if (time.getSeconds() == 0) {
			const betResponse = await fetch('/api/betResult', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ choice, betAmount })
			});
			choice = null;
			const betResult = await betResponse.json();
			won = betResult.win;
			balance = betResult.newBalance;
			profit = betResult.profit;
		}
	}

	//setting which side the user have chosen
	function setChoice(btnChoice: number) {
		choice = btnChoice;
		toast.success(`Bet placed on ${btnChoice}`);
	}

	//for updating the data every second
	onMount(() => {
		updateData();
		balance = data.balance;
		const interval = setInterval(updateData, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class=" flex h-screen w-screen flex-col">
	<!-- Navbar -->
	<nav class="flex w-full justify-between p-5">
		<h1 class="text text-2xl font-extrabold">Bin-T</h1>
		<h1 class="font-mono font-extrabold">Balance = {balance}</h1>
		<form action="/logout" method="POST">
			<Button class="btn" type="submit">Log out</Button>
		</form>
	</nav>

	<!-- Body -->
	<div class="grid flex-grow grid-flow-dense items-center justify-center px-2">
		<div class="  text-center">
			<!-- clock component -->
			<Clock />
			<!-- component for displaying the result of last round -->
			<!-- <RoundResult {result} {time} /> -->
		</div>

		<div>
			<h1 class=" text-center text-9xl font-extrabold">{result}</h1>
		</div>
		<!-- Buttons and text -->
		<div class="space-y-5 text-center">
			<!-- Component for showing the option chosen by user -->
			<Choice {choice} {time} />

			<!-- Buttons -->
			<div class=" flex items-center justify-center gap-6">
				<!-- Button 0 with dialouge popover -->
				<div>
					<Dialog.Root>
						<Dialog.Trigger>
							<Button size="lg" class="w-[100px] text-xl font-extrabold">0</Button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[300px]">
							<Dialog.Header>
								<Dialog.Title><h1 class=" font-bold">Confirm Bet</h1></Dialog.Title>
								<Dialog.Description>Choose amount for the bet</Dialog.Description>
							</Dialog.Header>
							<form
								action="?/bet0"
								method="POST"
								use:enhance
								class="flex flex-col items-center gap-4"
							>
								<div class="grid grid-cols-4 items-center justify-center gap-4">
									<Label for="bet">Amount</Label>
									<Input
										class="col-span-3 h-8"
										name="amount"
										placeholder="$100"
										type="number"
										min="1"
										max={balance}
										bind:value={betAmount}
									/>
								</div>
								{#if betAmount > balance}
									<small class=" text-red-500">Balance not enough!</small>
								{/if}
								<Dialog.Close>
									{#if balance >= betAmount}
										<Button type="submit" on:click={() => setChoice(0)}>Bet on 0</Button>
									{:else}
										<Button disabled>Bet on 0</Button>
										<small> <br /> Balance not enough!</small>
									{/if}
								</Dialog.Close>
							</form>
						</Dialog.Content>
					</Dialog.Root>
				</div>

				<!-- middle text info -->
				<div class=" text-center font-bold">
					<h1>${betAmount}</h1>
					{#if choice == null}
						<h1>Bet on [None]</h1>
					{:else}
						<h1>Bet on [{choice}]</h1>
					{/if}
				</div>

				<!-- Button 1 with dialouge popover -->
				<div>
					<Dialog.Root>
						<Dialog.Trigger>
							<Button size="lg" class="w-[100px] text-xl font-extrabold">1</Button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[300px]">
							<Dialog.Header>
								<Dialog.Title><h1 class=" font-bold">Confirm Bet</h1></Dialog.Title>
								<Dialog.Description>Choose amount for the bet</Dialog.Description>
							</Dialog.Header>
							<form
								action="?/bet1"
								method="POST"
								use:enhance
								class="flex flex-col items-center gap-4"
							>
								<div class="grid grid-cols-4 items-center justify-center gap-4">
									<Label for="bet">Amount</Label>
									<Input
										class="col-span-3 h-8"
										name="amount"
										placeholder="$100"
										type="number"
										min="1"
										max={balance}
										bind:value={betAmount}
									/>
								</div>
								{#if betAmount > balance}
									<small class=" text-red-500">Balance not enough!</small>
								{/if}
								<Dialog.Close>
									{#if balance >= betAmount}
										<Button type="submit" on:click={() => setChoice(1)}>Bet on 1</Button>
									{:else}
										<Button disabled>Bet on 1</Button>
									{/if}
								</Dialog.Close>
							</form>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		</div>

		<!-- If else statements for showing the result -->
		<WinResult {won} {time} {profit} />
	</div>
	<Toaster />
</div>
