# Tetris

## Посилання та шпаргалки

[урок 1](https://www.youtube.com/watch?v=hGEPkXBKoBM)
[урок 2](https://www.youtube.com/watch?v=LmFyvtGnnk4)
[урок 3](https://www.youtube.com/watch?v=gl-qRlQIZc4)

CSS:

- [Властивість `box-shadow`](CSS__box-shadow.md)
- [Властивість min() в `height` та `width`](<CSS__min().md>)

JS:

- [createElement('div')](JS___createElement.md)
- [document.querySelector('.tetris').append(div)](JS___querySelector.md)
- [Метод `fill()`](JS___fill.md)
- [Методи `new Array()` та `map()`](JS___Array_map.md)

- [Коли необхідне повернення значення у функції](JS__function_return_requirements.md)
- [Перетворення двовимірних координат в одновимірний індекс](JS__2D_to_1D_Index_Conversion.md)

[Шпаргалки за найпопулярнішими технологіями](https://overapi.com/)

`Ctrl + Shift + E` - в меню VSC відкривається робоча папка з файлами
`Ctrl + /` - написання коментаря в коді VSC
`Ctrl + ~` - виклик поля терміналу в VSC

## Пояснення. Послідовність створення гри

### 1. Розмітка HTML

- Створимо будь-який файл `*.html` (наприклад `index.html`)
- `!` - стартова розмітка html
- Запуск `Live Server` (Go Live)
- В `<body>` створюємо контейнер `.tetris` (<div class="tetris"></div>)

### 2. CSS

- Під'єднуємо стилі <link rel="stylesheet" href=""> (в `<head>`)
  прописуємо в ньому `href="style.css"` та створюємо сам файл `style.css`

- Прописуємо стилі за замовчуванням браузера - робимо "скидання зовнішніх відступів" (обнуленням `margin`):

```css
* {
  margin: 0;
}
```

- Напишемо стилі до тегу `body`:

```css
body {
  background: linear-gradient(90deg, rgb(18, 13, 164), rgb(98, 255, 0));
  height: 100vh;
}
```

- Cтилі до класу `tetris`:

```css
.tetris {
  border: 5px solid orange;
}
```

- Відцентруємо контейнер `.tetris` в `<body>` (за допомогою `flex`):

```css
body {
  /* Встановлює фоновий градієнт для тіла сторінки */
  /* '90deg' визначає напрямок градієнта - (90 градусів) означає, що градієнт йде горизонтально зліва направо. */
  /* К-сть кольорів безмежна, тут їх два: */
  background: linear-gradient(90deg, rgb(18, 13, 164), rgb(98, 255, 0));

  /* Встановлює висоту елемента на 100% висоти вікна перегляду */
  height: 100vh;

  /* Встановлює режим розміщення як гнучкий контейнер (flex container) */
  display: flex;

  /* Центрує всі дочірні елементи горизонтально всередині контейнера */
  justify-content: center;

  /* Центрує всі дочірні елементи вертикально всередині контейнера */
  align-items: center;

  /* place-content: center; */ /* - Альтернативний варіант - встановлює обидві осі (горизонтальну і вертикальну) на центр. Це аналогічно використанню justify-content: center; і align-items: center; разом. */
}
```

- В контейнер `tetris` добавимо ще три контейнери `div`:

```html
<div class="tetris">
  <div></div>
  <div></div>
  <div></div>
</div>
```

І стилі до них:

```css
.tetris div {
  height: min(4vh, 7vw);
  width: min(4vh, 7vw);
  background: lightgrey;
}
```

Натискаємо на квадратик перед `lightgrey` (у VSC) і у вікні, яке з'явиться можемо змінити колір або просто встановити прозорість: `background: rgba(211, 211, 211, 0.4);`

Продовжуємо писати стиль до цього елемента (з поясненням):

```css
.tetris div {
  /* Встановлює висоту елемента як мінімум з 4% висоти вікна перегляду (vh) або 7% ширини вікна перегляду (vw), вибираючи менше значення */
  height: min(4vh, 7vw);

  /* Встановлює ширину елемента як мінімум з 4% висоти вікна перегляду (vh) або 7% ширини вікна перегляду (vw), вибираючи менше значення */
  width: min(4vh, 7vw);

  /* Встановлює фоновий колір з 40% прозорістю (rgba) світло-сірого кольору */
  background: rgba(211, 211, 211, 0.4);

  /* Встановлює внутрішню тінь (inset) з параметрами:
       - тінь зсередини з відступом 2px зверху та зліва, з розмиттям 2px, червоного кольору
       - тінь зсередини з відступом -2px знизу та справа, з розмиттям 2px, темно-фіолетового кольору */
  box-shadow: inset 2px 2px 2px rgb(221, 54, 54), /* внутрішня тінь червоного кольору з відступом 2px зверху та зліва, з розмиттям 2px*/
      inset -2px -2px 2px rgb(62, 0, 139); /* внутрішня тінь темно-фіолетового кольору з відступом -2px */
}
```

---

- Після попереднього налаштування поля гри (квадратиків `div` вкладених в `.tetris`) поки його закоментуємо (`Ctrl + /`):

```html
<div class="tetris">
  <!-- <div></div> -->
  <!-- <div></div> -->
  <!-- <div></div> -->
</div>
```

### 3. JavaScript

#### Налаштування

- Створюємо зсилку на файл JS (під'єднюємо JavaScript) внизу тегу `<body>`:<br>
  Набираємо скоричено `script:src` і Emmet-ом розвертаємо команду в рядок: `<script src=""></script>`<br>
  Пишемо назву файлу в `src= `:<br>
  `<script src="scripts.js"></script>` і створюємо цей файл `scripts.js` в VSC в корінній папці<br>

- Перевіряємо чи вірно під'єднали:
  Наберемо у файлі `.js` команду `alert()` і в браузері маємо отримати вспливаюче вікно.<br>
  Витираємо, це просто перевірка!

#### STEP-1

##### Пропишемо константи:

```js
const PLAYFILED_COLUMNS = 10; // Кількість колонок у ігровому полі
const PLAYFILED_ROWS = 20; // Кількість рядків у ігровому полі
```

##### Створимо функцію генерації ігрового поля:

```js
function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div); // Створення елементів div для ігрового поля
  }
}
```

---

**`const div = document.createElement('div');`**

створюється новий елемент `div` у документі. Ця команда використовується для створення нового HTML-елемента в пам'яті, який потім можна додати до документу або маніпулювати ним перед додаванням.<br>

Детальніше:

`document`: Об'єкт, який представляє весь **HTML-документ**. Він надає доступ до елементів сторінки і дозволяє маніпулювати ними.<br>
`createElement('div')`: Метод об'єкта `document`, який створює новий елемент типу, вказаного в дужках. У цьому випадку створюється елемент `div`.<br>
`const div`: Змінна, яка оголошується за допомогою `const` і використовується для зберігання посилання на створений елемент `div`.<br>
Після створення елемента `div`, його можна додати до **DOM** (Document Object Model) або змінити його властивості (такі як id, class, textContent тощо).<br>

**`document.querySelector('.tetris').append(div);`**

означає, що створений елемент `div` додається до елемента з класом `tetris` в **DOM**.<br>

Детальніше:

`document`: Об'єкт, що представляє весь **HTML-документ**. Він надає доступ до елементів сторінки і дозволяє маніпулювати ними.<br>
`querySelector('.tetris')`: Метод об'єкта `document`, який повертає перший елемент, що відповідає CSS-селектору. У цьому випадку це перший елемент з класом `tetris`.<br>
`.append(div)`: Метод, який додає (вставляє) вказаний елемент (`div`) як останню дитину до вибраного елемента.<br>

Таким чином, весь запис виконує наступні дії:

Використовує `document.querySelector('.tetris')` для вибору першого елемента з класом `tetris` в документі.
Додає створений елемент `div` як останню дитину вибраного елемента з класом `tetris`.

---

Визвемо цю функцію для генерації `div`:
`generatePlayfield();`

Весь код тепер має вигляд:

**_STEP-1:_**

```js
const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
}

generatePlayfield();
```

#### STEP-2

##### Стилі для створених елементів `div` в загальному контейнері класу `.tetris`:

```css
.tetris {
  border: 5px solid orange;
  display: grid;
  grid-template-columns: repeat(
    10,
    auto
  ); /* визначає шаблон колонок у сітці. В даному випадку використовується функція `repeat`, яка створює 10 колонок, причому кожна колонка буде мати розмір, визначений автоматично (залежно від вмісту) */
}
```

##### Створюємо масив імен тетраміно:

```js
const TETROMINO_NAMES = ["O", "L"];
```

!!! Тетраміно — геометричні фігури **Тетрісу**, що складаються з чотирьох квадратів, з'єднаних сторонами у вигляді букв I, J, L, O, S, T, Z !!!

##### Створюємо об'єкт, що зберігає фігури тетроміно (їх матриці)

```js
const TETROMINOES = {
  O: [[1]],
  L: [[1]],
};
```

---

**Матриця**

В контексті гри Тетріс, матриця використовується для представлення форми тетроміно (ігрової фігури) і її позиції на ігровому полі.

---

##### Функція генерування нового тетроміно (на полі):

```js
function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0]; // Вибір імені тетроміно (тут, для прикладу, поки зафіксуємо вибір першого елементу)
  const matrix = TETROMINOES[0]; // Вибір матриці тетроміно

  const columnTetro = 4; // Початкове розміщення фігури - колонка для тетроміно
  const rowTetro = 5; //                             - рядок для тетромі
}
```

Ініціалізуємо **Об'єкт для тетроміно** з порожніми (або нульовими значеннями), щоб забезпечити наявність всіх необхідних властивостей.
Пропишемо це на початку, під константами

```js
let tetromino = {
  name: "",
  matrix: [],
  column: 0,
  row: 0,
};
```

У ф-ції `generateTetromino` об'єкт `tetromino` заповнюється відповідними значеннями, - іменем, матрицею форми та початковими координатами на ігровому полі:

```js
function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0];
  const matrix = TETROMINOES[0];

  const columnTetro = 4;
  const rowTetro = 5;

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}
```

**_STEP-2:_**

```js
const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;

const TETROMINO_NAMES = ["O", "L"];

const TETROMINOES = {
  O: [[1]],
  L: [[1]],
};

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
}

function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0]; // Вибір імені тетроміно (поки зафіксуємо вибір першого елементу)
  const matrix = TETROMINOES[0]; // Вибір матриці тетроміно

  const columnTetro = 4; // Початкове розміщення фігури - колонка
  const rowTetro = 5; //                                - рядок
}

generatePlayfield();
generateTetromino();
```

#### STEP-3

##### Отримуємо всі клітинки ігрового поля

Після виклику ф-ції генерації ігрового поля `generatePlayfield()` напишемо:

```js
let cells = document.querySelectorAll(".tetris div"); //
```

**Пояснення:**

1. `document`:

представляє весь `HTML-документ`, завантажений у браузер. Це основна точка доступу для взаємодії з **DOM** (Document Object Model).<br>

2. `querySelectorAll`:

метод об'єкта `document`, повертає елементи в документі, які відповідають `CSS-селектору`.<br>
Цей метод повертає статичний `NodeList` (масивоподібний об'єкт) всіх знайдених елементів. На відміну від масивів, `NodeList` не має всіх методів масиву, але можна використовувати цикли для його перебору.<br>

3. `CSS-селектор ".tetris div"`:

Цей селектор, шукає всі `div-елементи`, що є нащадками елемента з класом `tetris`.<br>

4. Присвоєння результату змінній `cells`:

Результат виконання `document.querySelectorAll(".tetris div")` (`NodeList` з усіма знайденими div-елементами) присвоюється змінній **cells**.<br>
Тепер **cells** містить `NodeList`, який можна перебирати за допомогою циклів.<br>

**В контексті гри`Tetris`:**
Створюємо ігрове поле як набір `div-елементів`, і `cells` містить всі ці елементи. Потім можна буде маніпулювати цими елементами (додавати або видаляти класи), щоб візуально відображати тетроміно і їхні рухи на ігровому полі.

##### Функція для малювання ігрового поля

(додає клас тільки до одного конкретного елементу з індексом `cellIndex`)

```js
function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      const nameFigure = "L"; // Встановлення імені фігури (хардкод)
      const cellIndex = 20; //  індекс позиції (хардкод)

      cells[cellIndex].classList.add(nameFigure); // Додавання класу до відповідного елемента
    }
  }
}
```

**Підсумок**<br>
Функція `drawPlayfield` проходить по всіх комірках ігрового поля (рядок за рядком, колонка за колонкою) і для кожної комірки виконує наступні дії:<br>

- Визначає захардкоджене ім'я фігури (в даному випадку "O").
- Конвертує позицію комірки у двовимірному масиві у індекс одномірного масиву.
- Використовуючи отриманий індекс, додає відповідний клас до `HTML-елемента`, що представляє цю комірку.<br><br>

  В результаті кожна комірка на ігровому полі отримає клас `"O"`. Це дає можливість візуально відобразити фігури на полі.

##### Стилі фігур

Щоб побачити фігуру на полі (один дів на полі вже має окремий клас фігури) додамо стилі за допомогою **_специфічних селекторів_**, таких як `.tetris .O`, що дозволяє уникнути конфліктів та перебивання стилів (інакше оголошений вище `.tetris div` переб'є класовий селектор `.O`):

```css
.tetris .O {
  background: red;
}

.tetris .L {
  background: green;
}
```

**Пояснення:**

- **Специфічність CSS**
  Специфічність визначає пріоритет різних `CSS-правил`, застосованих до одного й того ж елемента. Більш специфічні селектори мають вищий пріоритет. Якщо два `CSS-правила` мають однакову специфічність, останнє правило в коді матиме пріоритет.

- **Специфічність різних селекторів**
  Елементний селектор (наприклад, `div`) має низьку специфічність.
  Класовий селектор (наприклад, `.O`) має вищу специфічність.
  Комбінований класовий селектор (наприклад, `.tetris .O`) має ще вищу специфічність.

**_STEP-3:_**

```js
const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;

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
  const nameTetro = TETROMINO_NAMES[0];
  const matrix = TETROMINOES[0];

  const columnTetro = 4;
  const rowTetro = 5;

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      const nameFigure = "O"; //! Тимчасово захардкодимо
      const cellIndex = 43; //! Тимчасово захардкодимо

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
}

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();

drawPlayfield();
```

#### STEP-4

##### Функція для конвертації позиції в індекс у одномірному масиві

```js
function convertPositionToIndex(row, col) {
  return row * PLAYFILED_COLUMNS + col;
}
```

##### Підставимо Ф-цію для конвертації позиції у Ф-цію для малювання ігрового поля

```js
function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      const nameFigure = "O"; //! Тимчасово захардкодимо
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}
```

**! Все ігрове поле тепер має колір фігури, яку ми захардкодили. Тому введемо нову змінну:**

##### Змінна стану ігрового поля

`playfield` - центральна змінна, яка зберігає стан ігрового поля та місце знаходження фігури, дозволяє оновлювати візуалізацію та керувати логікою гри.<br>
Оголосимо після костант:

```js
let playfield;
```

**Ініціалізація `playfield`**
При створенні ігрового поля, `playfield` ініціалізується як двовимірний масив заданого розміру ігровим полелем (к-кість рядків та стовпців):

```js
// Створюємо новий двовимірний масив `playfield` розміром PLAYFIELD_ROWS на PLAYFIELD_COLUMNS
playfield = new Array(PLAYFIELD_ROWS)
  // Заповнюємо масив пустими значеннями
  .fill()
  // Для кожного елемента масиву створюємо новий масив розміром PLAYFIELD_COLUMNS, заповнений значенням 0
  .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));

// Виводимо створений масив у консоль у вигляді таблиці для зручності перевірки
console.table(playfield);
```

В нас `playfield` ініціалізується як двовимірний масив розміром 20x10, де кожен елемент масиву заповнений значенням `0` (всі клітинки порожні).

```js
function generatePlayfield() {
  for (let i = 0; i < PLAYFILED_COLUMNS * PLAYFILED_ROWS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }

  playfield = new Array(PLAYFILED_ROWS)
    .fill()
    .map(() => new Array(PLAYFILED_COLUMNS).fill(0));

  console.table(playfield); // Виведення ігрового поля в консоль у вигляді таблички (для наглядності в девтулзах )
}
```

##### Зміни у функції для малювання ігрового поля `drawPlayfield`

[Перша версія функції](#Функція для малювання ігрового поля)

```js
function drawPlayfield() {
  playfield[7][6] = "O"; // Додається фігура "O" на позицію (7, 6)
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue; // Пропуск порожніх клітинок
      const nameFigure = "L"; // Встановлюємо фіксоване ім'я фігури "L"
      const cellIndex = convertPositionToIndex(row, column); // Конвертація позиції в індекс

      cells[cellIndex].classList.add(nameFigure); // Додаємо клас "L" до комірки
    }
  }
}
```

###### Результат змін (з поясненням):\*\*

**1. Встановлення фігури "O" на позицію (7, 6):**

```js
playfield[7][6] = "O";
```

Цей рядок коду встановлює значення `"O"` у комірці ігрового поля на позиції `(7, 6)`.<br>
До малювання ігрового поля комірка на позиції `(7, 6)` заповнюється значенням `"O"`.<br>

**2. Перевірка, чи містить комірка фігуру:**

```js
if (!playfield[row][column]) continue;
```

Цей рядок перевіряє, чи містить поточна комірка якусь фігуру. Якщо комірка порожня (`undefined` або `0`), цикл пропускає цю комірку (`continue`).<br>
Порожні комірки (ті, що не містять фігур) будуть пропускатися, і клас до них не буде додаватися.<br>

- Перевірка значення комірки:

- `if (!playfield[row][column])`
  Вираз playfield[row][column] звертається до конкретної комірки у двовимірному масиві `playfield` на позиції, заданій індексами row і column.
  Оператор `! (логічне заперечення)` перевіряє, чи значення цієї комірки є "пустим". У **JavaScript** значення вважається "пустим" або "несправжнім" (`falsy`), якщо воно дорівнює одному з наступних значень: `false`, `0`, `"" (порожній рядок)`, `null`, `undefined` або `NaN`.<br>

- Продовження циклу:

- `continue;`
  Якщо умова !playfield[row][column] є істинною (тобто комірка порожня), виконується оператор `continue`.
  Оператор `continue` припиняє поточну ітерацію внутрішнього циклу `for`, і цикл переходить до наступної ітерації. Це означає, що будь-який код після `continue` у поточній ітерації не виконується.<br>

**Результат**

Порожні комірки пропускаються, і клас до них не додається.<br>
Тільки комірки, які містять фігуру (в нашому випадку `(7, 6)`), отримують клас `"L"`.<br>

**Висновок**

Рядок `if (!playfield[row][column]) continue;` дозволяє ефективно пропускати порожні комірки ігрового поля, обробляючи лише ті, які містять фігури.<br>
Це забезпечує правильне відображення фігур на ігровому полі, уникаючи додавання класів до порожніх комірок.<br>

**3. Додаємо клас "L" до комірки:**

```js
const nameFigure = "L";

cells[cellIndex].classList.add(nameFigure);
```

Встановлюється фіксоване ім'я фігури "L". Це ім'я буде використовуватися для додавання відповідного класу до комірок, які містять фігури.<br>
Всі комірки, які містять фігури (в даному випадку тільки комірка на позиції (7, 6)), отримають клас "L".

---

---

<br>

---

Код тепер має вигляд:

##### Малювання активного тетроміно

```js
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
```
