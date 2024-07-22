<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<div class=" flex h-screen w-screen flex-col items-center justify-center">
	<Card.Root class="w-[300px]">
		<Card.Header>
			<Card.Title>Register</Card.Title>
			<Card.Description>Create new account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form action="?/register" method="POST" class="grid gap-2">
				<div>
					<Label for="email">Email</Label>
					<Input type="email" name="email" placeholder="abc@example.com" />
				</div>
				<div>
					<Label for="password">Password</Label>
					<Input type="password" name="password" placeholder="password" />
				</div>
				<div>
					<Label for="passwordConfirm">Confirm Password</Label>
					<Input type="password" name="passwordConfirm" placeholder="confirm password" />
				</div>
				<Button type="submit" class="mt-3">Create</Button>
			</form>
		</Card.Content>
		<Card.Footer class="gap-2">
			<p>Already have an account?</p>
			<a href="/login" class="text-sm text-blue-700 underline">Log in</a>
		</Card.Footer>
	</Card.Root>
</div>
