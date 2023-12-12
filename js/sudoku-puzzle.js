const board = document.querySelector('.sudoku-board');
//const cell = document.querySelector('.grid-cell');

let grid = [
    [3, 1, 0],
    [2, 0, 1],
    [0, 2, 0]
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
            }

            board.appendChild(cell);
        }
    }
}
displaySudoku(grid);

const cells = document.querySelectorAll('.grid-cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
    });
})

