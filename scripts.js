// alert(); //* Перевірка чи вірно під'єднали файл

const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
}
