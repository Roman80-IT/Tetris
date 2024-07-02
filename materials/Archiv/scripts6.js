const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;
let playfield;

const TETROMINO_NAMES = ["O", "L", "J", "S", "Z", "I", "T"];

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
  name: "",
  matrix: [],
  column: 0,
  row: 0,
};

// COMMON

function convertPositionToIndex(row, col) {
  return row * PLAYFILED_COLUMNS + col;
}

function randomFigure(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// GENERATION

function generateTetromino() {
  const nameTetro = randomFigure(TETROMINO_NAMES);
  const matrix = TETROMINOES[nameTetro];

  // const columnTetro = 4; // Початкове розміщення фігури - колонка
  const columnTetro = Math.floor(PLAYFILED_COLUMNS / 2 - matrix.length / 2);
  const rowTetro = 2; //                                - рядок

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }

  playfield = new Array(PLAYFILED_ROWS)
    .fill()
    .map(() => new Array(PLAYFILED_COLUMNS).fill(0));

  console.table(playfield);
}

// KEYBOARD

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  if (event.key == "ArrowLeft") {
    tetromino.column -= 1; // Рух вліво
    if (isOutsideOfGameboard(tetromino.row, tetromino.column)) {
      tetromino.column += 1; // Повернення назад, якщо вийшли за межі
    }
  }
  if (event.key == "ArrowRight") {
    tetromino.column += 1; // Рух вправо
    if (isOutsideOfGameboard(tetromino.row, tetromino.column)) {
      tetromino.column -= 1; // Повернення назад, якщо вийшли за межі
    }
  }
  if (event.key == "ArrowDown") {
    tetromino.row += 1; // Рух вниз
    if (isOutsideOfGameboard(tetromino.row, tetromino.column)) {
      tetromino.row -= 1; // Повернення назад, якщо вийшли за межі
    }
  }
  draw(); // Перерисовка поля та тетроміно
}

function draw() {
  drawPlayfield(); // Відображення статичного ігрового поля
  cells.forEach((el) => el.removeAttribute("class")); // Очищення попередніх класів
  drawTetromino(); // Відображення активного тетроміно
}

// COLLISIONS

// Перевірка виходу за межі ігрового поля
function isOutsideOfGameboard(row, column) {
  console.log(row);
  console.log(PLAYFILED_ROWS - tetromino.matrix.length);
  return (
    column < 0 ||
    column > PLAYFILED_COLUMNS - tetromino.matrix.length ||
    row + tetromino.matrix.length > PLAYFILED_ROWS
  );
}

// DRAW

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetromino.matrix[row][column]) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name); // Додаємо клас для клітинок, що відповідають активному тетроміно
    }
  }
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue;

      const nameFigure = tetromino.name;
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();

draw();
