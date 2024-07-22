<script lang="ts">
    import { onMount } from 'svelte';
    let time = new Date();

    const updateTime = () => {
        time = new Date();
    };

    onMount(() => {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });

    export const formatTime = (date:Date) => {
        let hour = date.getHours();
        hour = hour % 12 ? hour % 12 : 12;
        const hours = String(hour).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return { hours, minutes, seconds };
    };

    $: formattedTime = formatTime(time);
</script>

<style>
    .clock {
        font-size: 2rem;
        text-align: center;
        font-weight: bolder;
    }
    .hours {
        font-size: 2rem;
        color:lightslategray
    }
    .minutes {
        font-size: 2rem;
        color:lightslategray
    }
    .seconds {
        font-size: 4rem;
    }
</style>

<div class="clock">
    <span class="hours">{formattedTime.hours}</span>:
    <span class="minutes">{formattedTime.minutes}</span>:
    <span class="seconds">{formattedTime.seconds}s</span>
</div>
