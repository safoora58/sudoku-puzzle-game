const board = document.querySelector('.sudoku-board');
const dridSell = document.querySelector('.grid-cell');


let grid = [
    [0, 0, 7, 4, 9, 1, 6, 0, 5],
    [2, 0, 0, 0, 6, 0, 3, 0, 9],
    [0, 0, 0, 0, 0, 7, 0, 1, 0],
    [0, 5, 8, 6, 0, 0, 0, 0, 4],
    [0, 0, 3, 0, 0, 0, 0, 9, 0],
    [0, 0, 6, 2, 0, 0, 1, 8, 7],
    [9, 0, 4, 0, 7, 0, 0, 0, 2],
    [6, 7, 0, 8, 3, 0, 0, 0, 0],
    [8, 1, 0, 0, 4, 5, 0, 0, 0]
]

function displaySudoku(grid) {
    board.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {

            const cell = document.createElement('div');
            
            cell.textContent = grid[row][col];
            cell.classList.add('grid-cell');

            if (grid[row][col] !== 0) {
                cell.classList.add('filled');
            }else{
                cell.textContent = '';
            }
            board.appendChild(cell);
        }
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                cell.classList.toggle('selected');
            });
        })
    }
}
displaySudoku(grid);

//check duplicate number 
let size = 9;
const isCorrectNum = (row, col, num) => {
    //check duplicate number in col 
    for (let i = 0; i < size; i++) {
        if (grid[col][i] === num) {
            console.log('false');
            return false;
        }
        return true;
    }
    //check duplicate number in row
    for (let i = 0; i < size; i++) {
        if (grid[row][i] === num) {
            console.log('false');
            return false;
        }
    }
    //check duplicate number in box 3*3
    let colStart = col - col % 3;
    let rowStart = row - row % 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (grid[i][j] === num) {
                console.log('false');
                return false;
            }
        }
    }
    console.log('true');
    return true;
}


















