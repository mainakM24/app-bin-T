<script>
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Sun } from 'lucide-svelte';
</script>

<ModeWatcher />
<Button
	class="absolute bottom-3 left-3 border-2"
	on:click={toggleMode}
	variant="outline"
	size="icon"
>
	<Sun />
</Button>
<slot></slot>
