<script lang="ts">
	let { data } = $props();

	let status = $state('info: only you can see the new skin.');
	let currentSkin = $state(data.skins[0]?.id);
	let otherSkin = $state(data.skins[1]?.id);
</script>

<svelte:head>
	<title>Skin Switcher | rock:sail</title>
</svelte:head>

<h1 class="mb-12 text-2xl">Skin Switcher</h1>

<form
	onsubmit={async (ev) => {
		ev.preventDefault();

		if (currentSkin === otherSkin) {
			status = 'you already have this skin, we cannot switch to it.';
			return;
		} else {
			status = 'switching skin...';
		}

		const res = await fetch('/api/skin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ oldSkin: currentSkin, newSkin: otherSkin })
		});

		if (res.ok) {
			status = 'successfully switched skin!';
			[currentSkin, otherSkin] = [otherSkin, currentSkin];
		} else {
			status = 'failed to switch skin :(';
		}
	}}
	class="mb-12 flex items-center gap-12"
>
	<label class="flex flex-col border p-2">
		<span>Your Skin</span>
		<select class="w-96" bind:value={currentSkin}>
			{#each data.skins as skin}
				<option value={skin.id}>{skin.name} ({skin.id})</option>
			{/each}
		</select>
	</label>

	<button type="submit" class="cursor-pointer border p-2">Switch</button>

	<label class="flex flex-col border p-2">
		<span>Other Skin</span>
		<select class="w-96" bind:value={otherSkin}>
			{#each data.skins as skin}
				<option value={skin.id}>{skin.name} ({skin.id})</option>
			{/each}
		</select>
	</label>
</form>

<span>{status}</span>
