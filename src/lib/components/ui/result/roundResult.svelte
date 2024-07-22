<script lang="ts">
    export let result: number;
    export let time: Date;
</script>


{#if result == null}
	<h1 class="mb-2 mt-2 font-mono text-xl">Loading...</h1>
{:else}
	<h1 class="mb-2 mt-2 font-mono text-xl">
		Binary for [{time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}] was {result}
	</h1>
{/if}
