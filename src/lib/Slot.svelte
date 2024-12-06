<script lang="ts">
	export let value: 0 | 1 | 2;

	let color;
	$: color = value === 1 ? 'red' : value === 2 ? 'yellow' : 'white';
</script>

<div
	class="h-[54px] w-[54px] rounded-[50%] border-2 border-gray-400/20 bg-[--color] p-4"
	style="--color: {color}"
></div>
