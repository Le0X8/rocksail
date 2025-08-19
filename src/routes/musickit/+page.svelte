<script lang="ts">
	let { data } = $props();

	let status = $state('info: only you can hear the new kit.');
	let currentKit = $state(data.musicKits[0]?.id);
	let otherKit = $state(data.musicKits[1]?.id);
</script>

<svelte:head>
	<title>Music Kit Switcher | rock:sail</title>
</svelte:head>

<h1 class="mb-12 text-2xl">Music Kit Switcher</h1>

<form
	onsubmit={async (ev) => {
		ev.preventDefault();

		if (currentKit === otherKit) {
			status = 'you already have this music kit, we cannot switch to it.';
			return;
		} else {
			status = 'switching music kit...';
		}

		const res = await fetch('/api/musickit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ oldKit: currentKit, newKit: otherKit })
		});

		if (res.ok) {
			status = 'successfully switched music kit!';
			[currentKit, otherKit] = [otherKit, currentKit];
		} else {
			status = 'failed to switch music kit :(';
		}
	}}
	class="mb-12 flex items-center gap-12"
>
	<label class="flex flex-col border p-2">
		<span>Your Music Kit</span>
		<select class="w-96" bind:value={currentKit}>
			{#each data.musicKits as kit}
				<option value={kit.id}>{kit.name}</option>
			{/each}
		</select>
	</label>

	<button type="submit" class="cursor-pointer border p-2">Switch</button>

	<label class="flex flex-col border p-2">
		<span>Other Music Kit</span>
		<select class="w-96" bind:value={otherKit}>
			{#each data.musicKits as kit}
				<option value={kit.id}>{kit.name}</option>
			{/each}
		</select>
	</label>
</form>

<span>{status}</span>
