<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	export let form;
</script>

<div class=" flex h-screen w-screen flex-col items-center justify-center">
	<Card.Root class="w-[300px]">
		<Card.Header>
			<Card.Title>Welcome back!!!</Card.Title>
			<Card.Description>login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form action="?/login" method="POST" class="grid gap-2">
				<div>
					<Label for="email">Email</Label>
					<Input type="email" name="email" placeholder="abc@example.com" />
					{#if form?.invalidCred}
						<small class="text text-red-500">Invalid credentials</small>
					{/if}
				</div>
				<div>
					<Label for="password">Password</Label>
					<Input type="password" name="password" placeholder="password" />
					{#if form?.invalidCred}
						<small class="text text-red-500">Invalid credentials</small>
					{/if}
				</div>
				<Button type="submit" class="mt-3">Log In</Button>
			</form>
		</Card.Content>
		<Card.Footer class="gap-2">
			<p>Don't have an account?</p>
			<a href="/register" class="text-sm text-blue-700 underline">Register</a>
		</Card.Footer>
	</Card.Root>
	{#if form?.notVerified}
		<Alert.Root variant="destructive" class='w-[300px] mt-2'>
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>We've sent you an Email, verify that first.</Alert.Description>
		</Alert.Root>
	{/if}
</div>
