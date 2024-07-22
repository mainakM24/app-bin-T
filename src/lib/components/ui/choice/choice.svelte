<script lang="ts">
    export let choice: number;
    export let time: Date
</script>


{#if choice === 1}
<h1 class="mb-2 mt-2 font-mono text-xl">
    You chose 1 for [{time.getHours()}:{String(time.getMinutes() + 1).padStart(2, '0')}]
</h1>
{:else if choice === 0}
<h1 class="mb-2 mt-2 font-mono text-xl">
    You chose 0 for [{time.getHours()}:{String(time.getMinutes() + 1).padStart(2, '0')}]
</h1>
{:else}
<h1 class="mb-2 mt-2 font-mono text-xl">
    Choose a binary for [{time.getHours()}:{String(time.getMinutes() + 1).padStart(2, '0')}]
</h1>
{/if}