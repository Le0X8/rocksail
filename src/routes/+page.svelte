<script lang="ts">
	const cheats: { name: string; url: string }[] = [
		{ name: 'Music Kit Switcher', url: '/musickit' },
		{ name: 'Agent Switcher', url: '/agent' }
	];
</script>

<svelte:head>
	<title>rock:sail</title>
</svelte:head>

<h1 class="mb-2 text-6xl font-bold">rock:sail</h1>
<h2 class="mb-12 text-lg">Counter-Strike 2 Asset Cheat</h2>

<div class="mb-12 w-128 border">
	<ul class="flex flex-col py-2">
		{#each cheats as cheat}
			<li class="px-4 py-1">
				<a class="underline" href={cheat.url}>
					&rarr; {cheat.name}
				</a>
			</li>
		{/each}
	</ul>
</div>

<p class="text-sm">created by <a href="https://github.com/Le0X8">@Le0X8</a></p>
