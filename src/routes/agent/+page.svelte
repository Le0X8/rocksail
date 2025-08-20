<script lang="ts">
	let { data } = $props();

	let status = $state('info: only you can see the new agent.');
	let currentAgent = $state(data.agents[0]?.id);
	let otherAgent = $state(data.agents[1]?.id);
</script>

<svelte:head>
	<title>Agent Switcher | rock:sail</title>
</svelte:head>

<h1 class="mb-12 text-2xl">Agent Switcher</h1>

<form
	onsubmit={async (ev) => {
		ev.preventDefault();

		if (currentAgent === otherAgent) {
			status = 'you already have this agent, we cannot switch to it.';
			return;
		} else {
			status = 'switching agent...';
		}

		const res = await fetch('/api/agent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ oldAgent: currentAgent, newAgent: otherAgent })
		});

		if (res.ok) {
			status = 'successfully switched agent!';
			[currentAgent, otherAgent] = [otherAgent, currentAgent];
		} else {
			status = 'failed to switch agent :(';
		}
	}}
	class="mb-12 flex items-center gap-12"
>
	<label class="flex flex-col border p-2">
		<span>Your Agent</span>
		<select class="w-96" bind:value={currentAgent}>
			{#each data.agents as agent}
				<option value={agent.id}>({agent.side}) {agent.name}</option>
			{/each}
		</select>
	</label>

	<button type="submit" class="cursor-pointer border p-2">Switch</button>

	<label class="flex flex-col border p-2">
		<span>Other Agent</span>
		<select class="w-96" bind:value={otherAgent}>
			{#each data.agents as agent}
				<option value={agent.id}>({agent.side}) {agent.name}</option>
			{/each}
		</select>
	</label>
</form>

<span>{status}</span>
