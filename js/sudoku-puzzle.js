const board = document.querySelector('.sudoku-board');
const mode = document.querySelector('.dark-light-mode');
const inputName = document.querySelector('#input-name');
const play = document.querySelector('#play');
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const cell = document.querySelector('.grid-cell');

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
];
let size = 9;

function displaySudoku(grid) {
    board.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {

            const cell = document.createElement('div');
            cell.textContent = grid[row][col];
            cell.classList.add('grid-cell');
            if (grid[row][col] !== 0) {
                cell.classList.add('filled');
            } else {
                cell.textContent = '';
            }
            if (row === 2 || row === 5) {
                cell.style.marginBottom ='10px';
                        }
                        if (col === 2 || col === 5) {
                            cell.style.marginRight ='10px';
                        }                    
                        board.appendChild(cell);
                    }
                }
           const cells = document.querySelectorAll('.grid-cell');
            cells.forEach(cell => {
            cell.addEventListener('click', () => {
            cell.classList.toggle('selected');
        });
    })

}
displaySudoku(grid);

let selectedNumber = null;
const getNumber = () => {
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            screen.style.display='none';
            number.style.backgroundColor = 'green';
            selectedNumber = number.textContent; 
           
        });
    });
}
getNumber();

// Add event listeners to the grid cells
const cells = document.querySelectorAll('.grid-cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (selectedNumber) {
            cell.textContent = selectedNumber; // Set the selected number
            cell.classList.add('filled');
            selectedNumber = null; // Reset the selected number
        }
    });
});
const isCorrectNum = (row, col, num) => {

    //check duplicate number in col 
    for (let i = 0; i < size; i++) {
        if (grid[i][col] === num) { 
            console.log('false');
            return false;
        }
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
};

function solve(col,row) {
    if(col === size && row ===size-1){
        displaySudoku(grid);
        return ;
    }
    if(col === size){
        row++;
        col=0;
    }
    if(grid[col][row] !==0){
        solve({col: col+1 , row});
        return;
    }
    if (grid[row][col] === 0) {
        for (let num = 1; num <= size; num++) {
            if (isCorrectNum(row, col, num)) {
                grid[row][col] = num;
               if( solve({col: col+1 , row})){
               }
                grid[row][col] = 0;
            }
        }
        return;
    }
    displaySudoku(grid);
}

function changeMode() {
    document.body.classList.add('dark');
}

const startGame = () => {
    startScreen.classList.remove('active');
   
    container.classList.add('active');
    }
function newGame() {
    console.log('jkf');
    if (inputName.value.trim().length > 0) {
        startGame();
        alert('start a new game');
    } else {
        inputName.classList.add('error-inputname');
        setTimeout(() => {
            inputName.classList.remove('error-inputname');
            inputName.focus();
        }, 500);
    }
}

play.addEventListener('click', newGame);
mode.addEventListener('click', changeMode);


