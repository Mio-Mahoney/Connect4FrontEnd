export default function checkWin(board: number[][]): number | undefined {
    for (let r = 0; r < board.length; r += 1) {
        for (let c = 0; c < board[r].length; c += 1) {
            if (
                !!board[r][c] &&
                board[r][c + 1] === board[r][c] &&
                board[r][c + 2] === board[r][c] &&
                board[r][c + 3] === board[r][c]
            ) {
                return board[r][c];
            }

            if (
                !!board[r][c] &&
                !!board[r + 3] &&
                board[r + 1][c] === board[r][c] &&
                board[r + 2][c] === board[r][c] &&
                board[r + 3][c] === board[r][c]
            ) {
                return board[r][c];
            }

            if (
                !!board[r][c] &&
                !!board[r + 3] &&
                !!board[r + 3][c + 3] &&
                board[r + 1][c + 1] === board[r][c] &&
                board[r + 2][c + 2] === board[r][c] &&
                board[r + 3][c + 3] === board[r][c]
            ) {
                return board[r][c];
            }

            if (
                !!board[r][c] &&
                !!board[r - 3] &&
                !!board[r - 3][c + 3] &&
                board[r - 1][c + 1] === board[r][c] &&
                board[r - 2][c + 2] === board[r][c] &&
                board[r - 3][c + 3] === board[r][c]
            ) {
                return board[r][c];
            }
        }
    }
}
