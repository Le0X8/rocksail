<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="block h-6 bg-slate-700 text-center font-mono font-bold text-white" href="/">rock:sail</a>

<main
	class="flex min-h-[calc(100lvh-1.5rem)] w-full flex-col items-center justify-center bg-slate-800 px-4 py-2 font-mono text-white"
>
	{@render children?.()}
</main>
