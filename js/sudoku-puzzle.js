const board = document.querySelector('.sudoku-board');
const mode = document.querySelector('.dark-light-mode');
const inputName = document.querySelector('#input-name');
const play = document.querySelector('#play');
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.number');
const numbersContainer = document.getElementById('numbersContainer');
const screen = document.querySelector('.screen');
const cell = document.querySelector('.grid-cell');
const btnDelete = document.querySelector('#btn-delete');
const btnSolve = document.querySelector('#btn-solve');
const newBoard = document.querySelector('#new-board');

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
            board.appendChild(cell);
        }
    }
}
displaySudoku(grid);

const insertNumber = () => {
    numbersContainer.addEventListener('click', e => {
        screen.style.display = 'none';
        changeNum = e.target.textContent;
        e.target.style.backgroundColor = 'green';
        setTimeout(() => {
            e.target.style.backgroundColor = '#f19249';
        }, 1000);

        console.log(changeNum);

        board.addEventListener('click', e => {
            e.target.textContent = changeNum;
            e.target.classList.add('filled');
            e.target.classList.add('zoom-in');
            setTimeout(() => {
                e.target.classList.remove('zoom-in');
            }, 500);
        });
    });
}
insertNumber();

const deleteNum = () => {
    btnDelete.addEventListener('click', () => {
        screen.style.display = 'none';

        board.addEventListener('click', e => {
            e.target.textContent = '';
            e.target.classList.remove('filled');
        });
    });
}
deleteNum();

function isCorrectNum  (row, col, num) {
    for (let i = 0; i < size; i++) {
        if (grid[i][col] == num) {
            return false;
        }
    }
    for (let j = 0; j < size; j++) {
        if (grid[row][j] == num) {
            return false;
        }
    }
    return true;
};

function isEmpty(row, col) {
    return grid[row][col] == 0 ? true : false
}

function solve() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let isEmpty2 = isEmpty(row, col);
            if (isEmpty2) {
                for (let num = 1; num <= size; num++) {
                    if (isCorrectNum(row, col, num)) {
                        grid[row][col] = num;

                        if (solve()) {                     
                            grid[row][col].textContent = grid[row][col];       
                            displaySudoku(grid);
                            return true
                        }
                        else {
                            grid[row][col] = 0
                        }
                    }                                       
                }
                return false
            }
        }
    }
    return true
}


const startGame = () => {
    startScreen.classList.remove('active');
    container.classList.add('active');
};

function newGame() {
    if (inputName.value.trim().length > 0) {
        startGame();
    } else {
        inputName.classList.add('error-inputname');
        setTimeout(() => {
            inputName.classList.remove('error-inputname');
            inputName.focus();
        }, 500);
    }
}

function changeMode() {
    document.body.classList.add('dark');
}

play.addEventListener('click', newGame);
mode.addEventListener('click', changeMode);
btnSolve.addEventListener('click', solve);
//newBoard.addEventListener('click', () => {
   // newGame();
//});

