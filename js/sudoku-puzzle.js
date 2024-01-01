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
const btnReset = document.querySelector('#reset');

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
let temp = []
let newGrid = [
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
let grid2 = []
let size = 9;
let changeNum2;
localStorage.clear()

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

function isCorrectNum(row, col, num, gridArray) {
    for (let i = 0; i < size; i++) {
        if (gridArray[i][col] == num) {
            return false;
        }
    }
    for (let j = 0; j < size; j++) {
        if (gridArray[row][j] == num) {
            return false;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gridArray[row - row % 3 + i][col - col % 3 + j] == num) {
                return false;
            }
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
                    if (isCorrectNum(row, col, num, grid)) {
                        grid[row][col] = num;
                        if (solve()) {
                            grid[row][col].textContent = grid[row][col];
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


numbersContainer.addEventListener('click', function (e) {
    let changeNum = Number(e.target.innerHTML)
    screen.style.display = 'none';
    e.target.classList.add('color');
    setTimeout(() => {
        e.target.classList.remove('color');
    }, 2000);
    localStorage.setItem('changeNum', changeNum);



})

board.addEventListener('click', e => {
    let changeNum2 = Number(localStorage.getItem('changeNum'))
    let targetIndexLocal = Number(localStorage.getItem('targetIndex'))
    const targetIndex = Array.from(board.children).indexOf(e.target);
    if (targetIndexLocal == targetIndex && Number(e.target.innerHTML) == changeNum2) return
    const row = Number(Math.floor(targetIndex / size));
    const col = Number(Math.floor(targetIndex % size));
    localStorage.setItem('targetIndex', targetIndex)
    if (changeNum2 == 0) {
        screen.style.display = 'none';
        e.target.textContent = '';
        e.target.classList.remove('filled');
        e.target.style.backgroundColor = 'rgba(157, 105, 206, 0.254)';

        newGrid[row][col] = changeNum2
        return
    }
    e.target.textContent = changeNum2;

    if (!isCorrectNum(row, col, changeNum2, newGrid)) {
        newGrid[row][col] = changeNum2
        e.target.style.backgroundColor = 'coral';
        e.target.classList.add('error-cell');
        setTimeout(() => {
            e.target.classList.remove('error-cell');
        }, 500);



    } else {
        newGrid[row][col] = changeNum2
        e.target.style.backgroundColor = 'rgb(136, 187, 187)';
        e.target.classList.add('zoom-in');
        setTimeout(() => {
            e.target.classList.remove('zoom-in');
        }, 500);
    }
});

//function deleteNum() {
//screen.style.display = 'none';
// e.target.textContent = '';
// e.target.classList.remove('filled');
// e.target.style.backgroundColor = 'red';
// const targetIndex = Array.from(board.children).indexOf(e.target);
// const row = Number(Math.floor(targetIndex / size));
// const col = Number(Math.floor(targetIndex % size));
// newGrid[row][col] = Number(0)
//}

btnDelete.addEventListener('click', function () {
    localStorage.setItem('changeNum', 0);
    screen.style.display = 'none';

})
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

function styleSudokuGrid() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
    });
}
styleSudokuGrid();

function generateNewGame() {
    newGrid = []
    grid = [];
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = 0;
        }
    }
    for (let i = 0; i < 25; i++) {
        let randomRow = Math.floor(Math.random() * size);
        let randomCol = Math.floor(Math.random() * size);
        let randomNum = numbers[Math.floor(Math.random() * numbers.length)];
        if (isEmpty(randomRow, randomCol)) {
            if (isCorrectNum(randomRow, randomCol, randomNum, grid)) {
                grid[randomRow][randomCol] = randomNum;
            }
            else {
                for (let num = 1; num <= 9; num++) {
                    randomNum = num
                    if (isCorrectNum(randomRow, randomCol, randomNum, grid)) {
                        grid[randomRow][randomCol] = randomNum;
                        break;
                    }
                }
            }
        }
        else i--
    }
    grid.forEach(num => {
        temp = []
        num.forEach(num2 => {
            temp.push(num2)
        })
        newGrid.push(temp)
    })
    if (solve()) {

        displaySudoku(newGrid)
    }
    else generateNewGame();
}

function resetGame() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!document.querySelector(`.grid-cell:nth-child(${i * size + j + 1})`).classList.contains('filled')) {
                grid[i][j] = 0;
                newGrid[i][j] = 0;
                document.querySelector(`.grid-cell:nth-child(${i * size + j + 1})`).textContent = '';
            }
        }
    }
    displaySudoku(grid);
}
// function resetGame() {
//     for (let i = 0; i < size; i++) {
//         for (let j = 0; j < size; j++) {
//             grid[i][j] = 0;
//         }
//     }
//     displaySudoku(grid);
// }

btnSolve.addEventListener('click', function () {
    solve()
    displaySudoku(grid)
});
newBoard.addEventListener('click', generateNewGame);
play.addEventListener('click', newGame);
btnReset.addEventListener('click', resetGame);

