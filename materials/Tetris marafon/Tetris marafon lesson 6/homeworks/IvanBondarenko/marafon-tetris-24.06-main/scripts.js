
const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS    = 20;
let playfield;
let cells;
let isPaused = false;
let timedId; 
let isGameOver = false;
let overlay = document.querySelector('.overlay');
let scoreElement = document.querySelector('.score');
let btnRestart = document.querySelector('.btn-restart')
let timeGame = document.querySelector('.time-game')
let btnRestartPerm = document.querySelector('.btn-restart-permanent');
let score = 0;


const TETROMINO_NAMES = [
    'O',
    'L',
    'J',
    'T',
    'I',
    'S',
    'Z',
]

const TETROMINOES = {
    'O':[
       [1, 1],
       [1, 1]
    ],
    'L':[
       [0, 0, 1],
       [1, 1, 1],
       [0, 0, 0],
    ],
    'J':[
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
     ],
     'T':[
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
     ],
     'I':[
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
     ],
     'S':[
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
     ],
     'Z':[
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
     ],

}



let tetromino = {
    name: '',
    matrix: [],
    column: 0,
    row: 0
}

// COMMON

function init(){
    score = 0;
    scoreElement.innerHTML = 0;
    isGameOver = false;
    generatePlayfield();
    cells = document.querySelectorAll('.tetris div');
    generateTetromino();
    
    moveDown();

}

function convertPositionToIndex(row, col){
    return row * PLAYFILED_COLUMNS + col; 
}

function randomFigure(array){
    const randomIndex = Math.floor(Math.random() * array.length );
    return array[randomIndex];
}

// GENERATION
function generateTetromino(){
    const nameTetro   = randomFigure(TETROMINO_NAMES);
    const matrix      = TETROMINOES[nameTetro];
    
    const columnTetro = Math.floor( PLAYFILED_COLUMNS / 2 - matrix.length / 2 )
    const rowTetro    = -2;
    
    tetromino = {
        name: nameTetro,
        matrix: matrix,
        column: columnTetro,
        row: rowTetro,
    }

}

function generatePlayfield(){

    for(let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++ ){
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFILED_ROWS).fill()
                        .map( ()=> new Array(PLAYFILED_COLUMNS).fill(0) )

}

// KEYBOARDS & CLICKS

btnRestart.addEventListener('click', function(){
    document.querySelector('.tetris').innerHTML = '';
    overlay.style.display = 'none';

    init();
})

btnRestartPerm.addEventListener('click', function(){
    document.querySelector('.tetris').innerHTML = '';
    overlay.style.display = 'none';

    init();
})

document.addEventListener('keydown', onKeyDown)

function onKeyDown(event){
    // console.log(event);
    if(event.key == 'Escape'){
        togglePaused();
    }
    if(!isPaused){
        if(event.key == ' '){
            dropTetrominoDown()
        }
        if(event.key == 'ArrowUp'){
            rotate();
        }
        if(event.key == 'ArrowLeft'){
            moveTetrominoLeft()
        }
        if(event.key == 'ArrowRight'){
            moveTetrominoRight()
        }
        if(event.key == 'ArrowDown'){
            moveTetrominoDown()
        }
    }
    draw()
}

function moveTetrominoDown(){
    tetromino.row += 1;
    if(!isValid()){
        tetromino.row -= 1;
        placeTetromino()
    }
}
function moveTetrominoLeft(){
    tetromino.column -= 1;
    if(!isValid()){
        tetromino.column += 1;
    }
}
function moveTetrominoRight(){
    tetromino.column += 1;
    if(!isValid()){
        tetromino.column -= 1;
    }
}

function draw(){
    cells.forEach( el => el.removeAttribute('class') )
    drawPlayfield();
    drawTetromino();
}

function dropTetrominoDown(){
    while(isValid()){
        tetromino.row++;
    }

    tetromino.row--;
}

function togglePaused(){

    if(isPaused){
        startLoop()
    } else {
        stopLoop();
    }

    isPaused = !isPaused;
}


function rotate(){
    rotateTetromino();
    draw();
}

function rotateTetromino(){
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    
    tetromino.matrix = rotatedMatrix;
    if(!isValid()){
        tetromino.matrix = oldMatrix;
    }
}

function rotateMatrix(matrixTetromino){
    const N = matrixTetromino.length;
    const rotateMatrix = [];

    for(let i = 0; i < N; i++){
        rotateMatrix[i] = [];
        for(let j = 0; j < N; j++ ){
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
        }
    }

    return rotateMatrix;

}


// COLLISIONS

function isValid(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(isOutsideOfGameboard(row, column)){ return false }
            if(hasCollisions(row, column)){ return false }
        }
    }

    return true;
}

function isOutsideOfTopGameboard(row){
    return tetromino.row + row < 0;
}

function isOutsideOfGameboard(row, column){
    return tetromino.matrix[row][column] &&
          (tetromino.row + row >= PLAYFILED_ROWS || 
           tetromino.column + column < 0 ||
           tetromino.column + column >= PLAYFILED_COLUMNS)
}

function hasCollisions(row, column){
    return tetromino.matrix[row][column] && playfield[tetromino.row + row]?.[tetromino.column + column]
}

// DRAW
function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            
            if(isOutsideOfTopGameboard(row)) { continue } 
            if(!tetromino.matrix[row][column]){ continue }
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawPlayfield(){
    for( let row = 0; row < PLAYFILED_ROWS; row++ ){
        for(let column = 0; column < PLAYFILED_COLUMNS; column++){
            if(!playfield[row][column]) continue;
            const nameFigure = playfield[row][column];
            const cellIndex  = convertPositionToIndex(row, column);

            cells[cellIndex].classList.add(nameFigure);
        }
    }
}


function countScore(destroyRows){
    if(destroyRows == 1){
        score += 10;
    }
    if(destroyRows == 2){
        score += 20;
    }
    if(destroyRows == 3){
        score += 50;
    }
    if(destroyRows == 4){
        score += 100;
    }

    scoreElement.innerHTML = score;
}

function placeTetromino(){
    const tetrominoMatrixSize = tetromino.matrix.length;
    for( let row = 0; row < tetrominoMatrixSize; row++ ){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            if(isOutsideOfTopGameboard(row)){
                isGameOver = true;
                overlay.style.display = 'flex';
                timeGameStop();
                timeGame.innerHTML = i + 'sek';
                return;
            }
            if(tetromino.matrix[row][column]){
                playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
            }
        }
    }
    
    let filledRows  = findFilledRows();
    
    removeFillRow(filledRows)
    countScore(filledRows.length)
    generateTetromino()
}

function findFilledRows(){
    const fillRows = [];

    for(let row = 0; row < PLAYFILED_ROWS; row++){
        let filledColumns = 0;
        for(let column = 0; column < PLAYFILED_COLUMNS; column++){
            if(playfield[row][column] != 0){
                filledColumns++;
            }
        }
        // for 2
        if(PLAYFILED_COLUMNS == filledColumns){
            fillRows.push(row);
        }
    }
    // for 1
    return fillRows;
}


function removeFillRow(filledRows){
    
    for(let i = 0; i < filledRows.length; i++){
        const row = filledRows[i];
        dropRowsAbove(row);
    }
}

function dropRowsAbove(rowDelete){
    for(let row = rowDelete; row > 0 ; row--){
        playfield[row] = playfield[row - 1]
    }
    playfield[0] = new Array(PLAYFILED_COLUMNS).fill(0);
}

function moveDown(){
    moveTetrominoDown();
    draw();
    stopLoop();
    startLoop();
}

function startLoop(){
   timedId = setTimeout( ()=> requestAnimationFrame(moveDown), 700 )
}

function stopLoop(){
    clearTimeout(timedId);

    timedId = null;
}


let i = 0;
let timeGameID = null;
function timeGameStart(){
    timeGameID = setInterval(function(){
        i++
    }, 1000)
}

function timeGameStop(){
    clearInterval(timeGameID)
}

timeGameStart();

init();