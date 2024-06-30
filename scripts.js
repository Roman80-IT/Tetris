const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;
let playfield;

const TETROMINO_NAMES = ["O", "L"];

const TETROMINOES = {
  O: [[1]],
  L: [[1]],
};

let tetromino = {
  name: "",
  matrix: [],
  column: 0,
  row: 0,
};

function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0]; // Вибір імені тетроміно (поки зафіксуємо вибір першого елементу)
  const matrix = TETROMINOES[0]; // Вибір матриці тетроміно

  const columnTetro = 4; // Початкове розміщення фігури - колонка
  const rowTetro = 5; //                                - рядок

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}

function drawPlayfield() {
  playfield[7][6] = "O";
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue;
      const nameFigure = "L"; //! Тимчасово захардкодимо та ще й невідповідною фігурою
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}

function convertPositionToIndex(row, col) {
  return row * PLAYFILED_COLUMNS + col;
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

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();

drawPlayfield();
