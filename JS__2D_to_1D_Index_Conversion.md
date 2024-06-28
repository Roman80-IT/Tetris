# Перетворення двовимірних координат в одновимірний індекс

## Опис

Цей документ пояснює, як перетворити двовимірні координати (рядок і стовпець) у одновимірний індекс. Це корисно, коли потрібно працювати з одновимірними масивами для представлення двовимірних даних.

## Функція

```js
/**
 * Перетворює двовимірні координати (рядок і стовпець) в одновимірний індекс.
 *
 * @param {number} row - Індекс рядка.
 * @param {number} col - Індекс стовпця.
 * @param {number} columns - Кількість стовпців у двовимірному масиві.
 * @returns {number} Одновимірний індекс.
 */
function convertPositionToIndex(row, col, columns) {
  return row * columns + col;
}
```

## Пояснення

Функція `convertPositionToIndex` використовує наступну формулу для перетворення координат:

```css

index = row * columns + col
```

## Аргументи

- `row`: Індекс рядка.
- `col`: Індекс стовпця.
- `columns`: Кількість стовпців у двовимірному масиві.

## Приклад

Припустимо, є ігрове поле розміром 10 стовпців (ширина) і 20 рядків (висота), представлене двовимірним масивом. Потрібно знайти одновимірний індекс для координат (2, 3).

```js
let row = 2;
let col = 3;
let columns = 10;
let index = convertPositionToIndex(row, col, columns);
console.log(index); // Виведе 23
```

## Використання

Ця ф-ція може бути використана для роботи з одновимірним масивом, який представляє двовимірну структуру (наприклад, ігрове поле `Тетріс`):

```js
let playfield = new Array(20).fill().map(() => new Array(10).fill(0));
let cells = document.querySelectorAll(".tetris div");

function drawPlayfield() {
  for (let row = 0; row < playfield.length; row++) {
    for (let col = 0; col < playfield[row].length; col++) {
      if (!playfield[row][col]) continue;
      let cellIndex = convertPositionToIndex(row, col, playfield[row].length);
      cells[cellIndex].classList.add("filled");
    }
  }
}
```

Це дозволяє легко працювати з двовимірними даними як з одновимірними масивами, що спрощує маніпуляції з даними та `HTML-елементами`.

```vbnet

Таке ім'я і структура файлу забезпечать легке розуміння і навігацію для тих, хто працюватиме з цим кодом або документацією.

```
