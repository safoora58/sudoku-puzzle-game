const board = document.querySelector('.sudoku-board');
const dridSell = document.querySelector('.grid-cell');
const mode = document.querySelector('.dark-light-mode');
const inputName = document.querySelector('#input-name');
const play = document.querySelector('#play');
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const sudokuBoard = document.querySelector('.sudoku-board');
const container = document.querySelector('.container');


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
let size = 9;

function displaySudoku(grid) {
    //check duplicate number 
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
            board.appendChild(cell);
        }
    }
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaa');
            cell.classList.toggle('selected');
        });
    })
}

displaySudoku(grid);
const isCorrectNum = (row, col, num) => {

    //check duplicate number in col 
    for (let i = 0; i < size; i++) {
        if (grid[i][col] === num) {
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












    // function isEmpty(rpw, col) {
    //     !grid[row][col] ? true : false
    // }
    
    // function solve() {
    //     for (i = 0; i < size; i++) {
    //         for (j = 0; j < size; j++) {
    //             let isEmpty = isEmpty()
    //             if (isEmpty) {
    //                 for (num = 1; num = size; num++) {
                       
                        
    
    //                 }
    //             }
    //         }
    //     }
    // }
    
    
    
    
    // function initGameGrid() {
    //     let size = 9;
    //     const cells = document.querySelectorAll('.grid-cell');
    //     let index = 0;
    //     for (let i = 0; i < Math.pow(size, 2); i++) {
    //         let row = Math.floor(i / size);
    //         let col = i % size;
    //         if (row === 3 || row === 6) {
    //             cells[index].style.marginBottom ='10px';
    //         }
    //         if (col === 3 || col === 6) {
    //             cells[index].style.marginRight ='10px';
    //         }
    //         index++;
    //     }
    // }
    // initGameGrid();