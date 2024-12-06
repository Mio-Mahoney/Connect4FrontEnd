<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import Slot from './Slot.svelte';
	import checkWin from './checkWin';

	let boardNode: any;
	export let onGameEnd = (winner: number) => {
		console.info(`Game ended. Winner: ${winner}`);
	};
	let board = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];

	let placeholderPosition = tweened(0, {
		easing: cubicOut
	});

	let player = 2;
	let playingIndex = 0;
	function handleMouseMove(event: MouseEvent) {
		const boardNodeX = boardNode.getBoundingClientRect().x;
		const deltaX = event.clientX - boardNodeX - 4;
		playingIndex = Math.min(Math.max(Math.floor(deltaX / (54 + 18)), 0), 6);
		console.log(playingIndex);
		placeholderPosition.set(playingIndex * (54 + 18) + 16);
	}

	function changeBoard(board: number[][], colIndex: number, player: number): number[][] {
		const newBoard = board.map((row) => row.map((value) => value));
		for (let ri = board.length - 1; ri >= 0; ri -= 1) {
			if (!board[ri][colIndex]) {
				newBoard[ri][colIndex] = player;
				break;
			}
		}

		return newBoard;
	}
	function isBoardFull(board: number[][]): boolean {
		return !board.some((row) => row.includes(0));
	}

	function handleClick(colIndex: number) {
		console.info(`Player ${player} played at ${colIndex}`);
		board = changeBoard(board, colIndex, player);
		const winningPlayer = checkWin(board);

		if (winningPlayer || isBoardFull(board)) {
			onGameEnd(winningPlayer ?? 0);
		}
		player = player === 1 ? 2 : 1;
	}

	function getMove() {}
</script>

<div id="container" class="relative rounded-[4px] bg-blue-500 p-[16px]">
	<div
		id="placeholder"
		class="absolute left-[--pos] top-[-64px]"
		style="--pos: {$placeholderPosition}px;"
	>
		<Slot value={player} />
	</div>
	<div
		id="board"
		class="grid cursor-pointer grid-cols-7"
		bind:this={boardNode}
		on:mousemove={handleMouseMove}
		on:mousedown={() => handleClick(playingIndex)}
		role="presentation"
	>
		{#each board as row}
			{#each row as value}
				<div id="board slot" class="flex h-[70px] w-[70px] items-center justify-center">
					<Slot {value} />
				</div>
			{/each}
		{/each}
	</div>
</div>
