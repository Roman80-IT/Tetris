const PLAYFILED_COLUMNS = 10; // Кількість стовпців в ігровому полі
const PLAYFILED_ROWS = 20; // Кількість рядків в ігровому полі
let playfield; // Ігрове поле

const TETROMINO_NAMES = [
  "O",
  "L",
  "J",
  "S",
  "Z",
  "I",
  "T", // Імена тетроміно (фігур)
];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

let tetromino = {
  name: "", // Ім'я поточного тетроміно
  matrix: [], // Матриця поточного тетроміно
  column: 0, // Позиція стовпця
  row: 0, // Позиція рядка
};

// COMMON

function convertPositionToIndex(row, col) {
  return row * PLAYFILED_COLUMNS + col; // Конвертація позиції в індекс
}

function randomFigure(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]; // Вибір випадкової фігури
}

// GENERATION
function generateTetromino() {
  const nameTetro = randomFigure(TETROMINO_NAMES); // Вибір випадкового імені тетроміно
  const matrix = TETROMINOES[nameTetro]; // Отримання матриці для обраного тетроміно

  const columnTetro = Math.floor(PLAYFILED_COLUMNS / 2 - matrix.length / 2); // Розрахунок початкової позиції стовпця
  const rowTetro = 2; // Початкова позиція рядка

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div"); // Створення div для кожної клітинки
    document.querySelector(".tetris").append(div); // Додавання клітинки до ігрового поля
  }

  playfield = new Array(PLAYFILED_ROWS)
    .fill()
    .map(() => new Array(PLAYFILED_COLUMNS).fill(0)); // Створення пустого ігрового поля

  console.table(playfield);
}

// KEYBOARD

document.addEventListener("keydown", onKeyDown); // Додавання слухача подій для клавіатури

function onKeyDown(event) {
  if (event.key == "ArrowUp") {
    rotate(); // Обертання тетроміно
  }
  if (event.key == "ArrowLeft") {
    moveTetrominoLeft(); // Рух тетроміно вліво
  }
  if (event.key == "ArrowRight") {
    moveTetrominoRight(); // Рух тетроміно вправо
  }
  if (event.key == "ArrowDown") {
    moveTetrominoDown(); // Рух тетроміно вниз
  }
  draw(); // Перемалювання ігрового поля
}

function moveTetrominoDown() {
  tetromino.row += 1; // Зміщення тетроміно вниз
  if (!isValid()) {
    tetromino.row -= 1; // Відкат якщо не валідно
    placeTetromino(); // Розміщення тетроміно на полі
  }
}
function moveTetrominoLeft() {
  tetromino.column -= 1; // Зміщення тетроміно вліво
  if (!isValid()) {
    tetromino.column += 1; // Відкат якщо не валідно
  }
}
function moveTetrominoRight() {
  tetromino.column += 1; // Зміщення тетроміно вправо
  if (!isValid()) {
    tetromino.column -= 1; // Відкат якщо не валідно
  }
}

function draw() {
  cells.forEach((el) => el.removeAttribute("class")); // Очищення класів у всіх клітинок
  drawPlayfield(); // Малювання ігрового поля
  drawTetromino(); // Малювання тетроміно
}

// ROTATE

// Код для прикладу алгоритму обертання фігур
// let showRotated = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ]

function rotate() {
  rotateTetromino(); // Обертання тетроміно
  draw(); // Перемалювання ігрового поля
}

function rotateTetromino() {
  const oldMatrix = tetromino.matrix; // Збереження старої матриці
  const rotatedMatrix = rotateMatrix(tetromino.matrix); // Обертання матриці
  // showRotated = rotateMatrix(showRotated) // Код для прикладу алгоритму обертання фігур
  tetromino.matrix = rotatedMatrix; // Оновлення матриці тетроміно
  if (!isValid()) {
    tetromino.matrix = oldMatrix; // Відкат якщо не валідно
  }
}

function rotateMatrix(matrixTetromino) {
  const N = matrixTetromino.length;
  const rotateMatrix = [];

  for (let i = 0; i < N; i++) {
    rotateMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      rotateMatrix[i][j] = matrixTetromino[N - j - 1][i]; // Обертання матриці на 90 градусів за годинниковою стрілкою
    }
  }

  return rotateMatrix;
}

// COLLISIONS

function isValid() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (isOutsideOfGameboard(row, column)) {
        return false;
      } // Перевірка чи виходить за межі поля
      if (hasCollisions(row, column)) {
        return false;
      } // Перевірка на зіткнення з іншими фігурами
    }
  }

  return true;
}

function isOutsideOfGameboard(row, column) {
  return (
    tetromino.matrix[row][column] &&
    (tetromino.row + row >= PLAYFILED_ROWS ||
      tetromino.column + column < 0 ||
      tetromino.column + column >= PLAYFILED_COLUMNS)
  ); // Перевірка чи виходить за межі поля
}

function hasCollisions(row, column) {
  return (
    tetromino.matrix[row][column] &&
    playfield[tetromino.row + row]?.[tetromino.column + column]
  ); // Перевірка на зіткнення з іншими фігурами
}

// DRAW
function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      // Код для прикладу алгоритму обертання фігур
      // const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
      // cells[cellIndex].innerHTML = showRotated[row][column];

      if (!tetromino.matrix[row][column]) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name); // Додавання класу до клітинки
    }
  }
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue;
      const nameFigure = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure); // Додавання класу до клітинки
    }
  }
}

function placeTetromino() {
  const tetrominoMatrixSize = tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column]) {
        playfield[tetromino.row + row][tetromino.column + column] =
          tetromino.name; // Розміщення тетроміно на ігровому полі
      }
    }
  }
  console.log(playfield);
  generateTetromino(); // Генерація нового тетроміно
}

generatePlayfield(); // Генерація ігрового поля
let cells = document.querySelectorAll(".tetris div");
generateTetromino(); // Генерація тетроміно

draw(); // Малювання ігрового поля
