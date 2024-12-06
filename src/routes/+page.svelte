<script lang="ts">
	import Board from '$lib/Board.svelte';

	let gameState: string = 'TITLE_SCREEN';
	let player: number = -1;
	function handleStartGame() {
		gameState = 'IN_PROGRESS';
	}

	function handleGameEnd(winner: number) {
		player = winner;
		gameState = 'GAME_OVER';
	}
</script>

<div class="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
	{#if gameState === 'TITLE_SCREEN'}
		<h1>Connect 4</h1>
		<button type="button" on:click={handleStartGame}>Click to start</button>
	{:else if gameState === 'IN_PROGRESS'}
		<Board onGameEnd={handleGameEnd} />
	{:else if player}
		<h1>Player {player} wins!</h1>
		<button type="button" on:click={handleStartGame}>Start over</button>
	{:else}
		<h1>Game over - it is a draw!</h1>
		<button type="button" on:click={handleStartGame}>Play again!</button>
	{/if}
</div>
