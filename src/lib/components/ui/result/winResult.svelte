<script lang="ts">
	export let profit;
	export let time: Date;
	export let won: boolean | null;
	let hour = time.getHours();
	let minute = time.getMinutes();
</script>

{#if won}
	<span class=" mt-5 rounded-md border-2 border-green-500 p-3">
		<h1 class="text-center font-mono text-xl">
			You won +${profit} <br/> in last round [{time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}]
		</h1>
	</span>
{:else if won === null}
	<span class="mt-5 rounded-md border-2 border-black p-3 dark:border-white">
		<h1 class="text-center font-mono text-xl">You didn't participate</h1>
		<h1 class="text-center font-mono text-xl">
			in last round [{time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}]
		</h1>
	</span>
{:else if won === false}
	<span class=" mt-5 rounded-md border-2 border-red-500 p-3">
		<h1 class="text-center font-mono text-xl">
			You lost -${profit} <br/> in the round [{time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}]
		</h1>
	</span>
{/if}
