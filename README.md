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

Продовжуємо писати стиль до цього елемента:

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

**_Код до STEP-1:_**

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

**_Код до STEP-2:_**

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

> 1. `document`:

> представляє весь `HTML-документ`, завантажений у браузер. Це основна точка доступу для взаємодії з **DOM** (Document Object Model).<br>

> 2. `querySelectorAll`:

> метод об'єкта `document`, повертає елементи в документі, які відповідають `CSS-селектору`.<br>
> Цей метод повертає статичний `NodeList` (масивоподібний об'єкт) всіх знайдених елементів. На відміну від масивів, `NodeList` не має всіх методів масиву, але можна використовувати цикли для його перебору.<br>

> 3. `CSS-селектор ".tetris div"`:

Цей селектор, шукає всі `div-елементи`, що є нащадками елемента з класом `tetris`.<br>

> 4. Присвоєння результату змінній `cells`:

> Результат виконання `document.querySelectorAll(".tetris div")` (`NodeList` з усіма знайденими div-елементами) присвоюється змінній **cells**.<br>
> Тепер **cells** містить `NodeList`, який можна перебирати за допомогою циклів.<br><br>

> > Створюємо ігрове поле як набір `div-елементів`, і `cells` містить всі ці елементи. Потім можна буде маніпулювати цими елементами (додавати або видаляти класи), щоб візуально відображати тетроміно і їхні рухи на ігровому полі.

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

Ф-ція `drawPlayfield` проходить по всіх комірках ігрового поля (рядок за рядком, колонка за колонкою) і для кожної комірки виконує наступні дії:<br>

- Визначає захардкоджене ім'я фігури (в даному випадку `"O"`).
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

- **Специфічність CSS**
  Специфічність визначає пріоритет різних `CSS-правил`, застосованих до одного й того ж елемента. Більш специфічні селектори мають вищий пріоритет. Якщо два `CSS-правила` мають однакову специфічність, останнє правило в коді матиме пріоритет.

- **Специфічність різних селекторів**
  Елементний селектор (наприклад, `div`) має низьку специфічність.
  Класовий селектор (наприклад, `.O`) має вищу специфічність.
  Комбінований класовий селектор (наприклад, `.tetris .O`) має ще вищу специфічність.

**_Код до STEP-3:_**

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

[Перша версія функції](#функція-для-малювання-ігрового-поля)

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

**_Код до STEP-4:_**

```js
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

function convertPositionToIndex(row, col) {
  return row * PLAYFILED_COLUMNS + col;
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
```

#### STEP-5 / Lesson-2

**Загальні зміни:**

- 1. **нові тетроміно**:<br>
     (J, S, Z, I, T) до масиву `TETROMINO_NAMES` і відповідно їхні матриці до об'єкту `TETROMINOES`.<br>

- 2. **Функція `randomFigure`**:<br>
     для випадкового вибору тетроміно.<br>

- 3. **Перевірка на вихід за межі ігрового поля (функція `isOutsideOfGameboard`)**:<br>
     для перевірки, чи тетроміно виходить за межі ігрового поля.<br>

- 4. **Додано обробку клавіш**:<br>
     Додано обробку клавіш для переміщення тетроміно вліво, вправо та вниз.<br>

- 5. **Функція `drawTetromino`**: <br>
     для відображення тетроміно на полі.<br>

- 6. **Оновлено функцію `drawPlayfield`**: <br>
     Дана ф-ція тепер динамічно відображає тетроміно на полі.<br>

##### Виправлення помилки у Функції генерування нового тетроміно:

`const matrix = TETROMINOES[`O`];` замість `const matrix = TETROMINOES[0];`

```js
function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0]; // Вибір імені тетроміно (поки зафіксуємо вибір першого елементу)
  const matrix = TETROMINOES[`O`]; // Вибір матриці тетроміно

  const columnTetro = 4; // Початкове розміщення фігури - колонка
  const rowTetro = 5; //                                - рядок

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}
```

##### Зміни у функції для малювання ігрового поля `drawPlayfield`

[Попередня версія функції](#Зміни-у-функції-для-малювання-ігрового-поля-`drawPlayfield`)

Видалимо статичне знаходження фігури `playfield[7][6] = "O";`<br>
та змінимо значення на "O": `const nameFigure = "L";`

```js
function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue;
      const nameFigure = "O"; //! змінили захардкоджене значення на "O"
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}
```

##### Визначаємо розміщення фігури через змінну `playfield`

###### Додамо функцію для відображення тетроміно на полі `drawTetromino` :

(малюємо активну фігуру)

```js
function drawTetromino() {
  const name = tetromino.name; // для зберігання назви поточного тетроміно в змінну 'name'
  const tetrominoMatrixSize = tetromino.matrix.length; //  зберігає розмір матриці тетроміно (наприклад, для 'O' це буде 2, для 'I' — 4)

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetromino.matrix[row][column]) {
        continue; //         Пропуск пустих клітинок - інакше відмалюється вся матриця (3х3 наприклад)
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name); // Додавання класу для відображення активного тетроміно
    }
  }
}
```

В кінці коду викликаємо її (останньою)<br><br>

**Детальний розбір рядка:**

```js
const cellIndex = convertPositionToIndex(
  tetromino.row + row,
  tetromino.column + column
);
```

- `tetromino.row` - це рядок у ігровому полі, де починається верхній рядок матриці активного тетроміно.<br>
- `tetromino.column` - це колонка у ігровому полі, де починається перша колонка матриці активного тетроміно.<br><br>

- `row` - це індекс поточного рядка у матриці тетроміно.<br>
- `column` - це індекс поточної колонки у матриці тетроміно.<br><br>

- `tetromino.row + row` - обчислює реальний рядок у ігровому полі, де має бути намальована клітинка поточного тетроміно.<br>
- `tetromino.column + column` - обчислює реальну колонку у ігровому полі, де має бути намальована клітинка поточного тетроміно.<br><br>

- функція `convertPositionToIndex` - конвертує позицію (рядок, колонка) у одновимірний індекс для масиву `cells`, де зберігаються всі елементи ігрового поля. Наприклад, для ігрового поля 10x20 (де 10 колонок і 20 рядків), функція приймає номер рядка і номер колонки і повертає відповідний індекс у одновимірному масиві довжиною 200.<br><br>

> !!! Цикли у функції `drawTetromino` проходять через кожну клітинку матриці тетроміно і обчислюють її точну позицію на ігровому полі. При першій ітерації обчислюємо і відмальовуємо **_крайню ліву верхню клітинку фігури_**, а при останній ітерації – **_праву нижню клітинку_**. !!!

---

**Причини введення функції drawTetromino**<br><br>

1. Модульність і розділення обов'язків:<br><br>

- **_Розділення відображення фігури та поля_**: Раніше ф-ція `drawPlayfield` виконувала всі обов'язки з відображення ігрового поля та тетроміно. Введення окремої ф-ції `drawTetromino` дозволяє розділити ці обов'язки.<br>
  `drawPlayfield` тепер займається лише відображенням статичного ігрового поля, а `drawTetromino` – відображенням активного тетроміно. Це робить код більш читабельним і легким для підтримки.<br>
- **_Легкість оновлення коду_**: Коли логіка відображення тетроміно змінюється, потрібно оновити тільки `drawTetromino`, а не змішану функцію, яка відображає і поле, і фігури.<br><br>

2. Покращена функціональність:<br><br>

- Оновлення відображення при русі: Ф-ція `drawTetromino` дозволяє легко оновлювати відображення активного тетроміно при його переміщенні по полю. При кожному натисканні клавіші оновлюється положення тетроміно, і ф-ція `draw` (яка викликає `drawTetromino`) дозволяє коректно перерисувати активну фігуру на полі.<br>
- Підтримка багатьох типів тетроміно: `drawTetromino` може відображати різні типи тетроміно на основі їх матриці та імені, що робить код більш гнучким.<br><br>

3. Оптимізація продуктивності:<br><br>

- Менше перерисовок всього поля: Замість перерисовки всього ігрового поля, що може бути неефективним, функція `drawTetromino` дозволяє перерисовувати тільки активну фігуру, що економить ресурси і підвищує продуктивність.<br><br>

**Порівняння функцій `drawPlayfield `та `drawTetromino`**<br><br>

**_Функція `drawPlayfield`_**<br><br>

- Відповідає за відображення статичного ігрового поля.
- Пропускає пусті клітинки (клітинки, що не містять фігур).
- Відображає фігури, які вже закріплені на полі (ті, що не рухаються).<br><br>

**_Функція `drawTetromino`_**<br><br>

- Відповідає за відображення активного тетроміно (того, що рухається).
- Пропускає пусті клітинки в матриці тетроміно.
- Відображає тільки активне тетроміно, яке гравець може переміщати.<br><br>

**Основні відмінності та підходи:**<br><br>

1. Відображення статичних фігур проти активних фігур:<br><br>

- `drawPlayfield` малює фігури, що вже закріплені на ігровому полі, тобто ті, які вже стали частиною поля і більше не рухаються.
- `drawTetromino` малює активну фігуру, яка ще не закріплена і може переміщатися гравцем.<br><br>

2. Область дії:<br><br>

- `drawPlayfield` працює з усім ігровим полем і перевіряє кожну клітинку, чи є там закріплена фігура.
- `drawTetromino` працює тільки з матрицею активного тетроміно і відображає його на полі відповідно до поточної позиції.<br><br>

3. Частота викликів:<br><br>

- `drawPlayfield` зазвичай викликається рідше, можливо, коли потрібно перерисувати все поле (наприклад, після закріплення нового тетроміно).
- `drawTetromino` може викликатися частіше, кожного разу при переміщенні активного тетроміно, щоб відобразити його нову позицію.<br><br>

---

##### Нові тетроміно

```js
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
```

##### function `drawPlayfield()`

Для змінної `const nameFigure` хардкод із значенням "O" змінюємо на `tetromino.name`:

```js
function drawPlayfield() {
  for (let row = 0; row < PLAYFILED_ROWS; row++) {
    for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
      if (!playfield[row][column]) continue;
      // const nameFigure = "O"; //! змінили захардкоджене значення на "O"
      const nameFigure = tetromino.name;
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}
```

**_Код до STEP-5:_**

```js
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

// GENERATION

function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0]; // Вибір імені тетроміно (поки зафіксуємо вибір першого елементу)
  const matrix = TETROMINOES[`O`]; // Вибір матриці тетроміно // Вибір матриці тетроміно

  const columnTetro = 4; // Початкове розміщення фігури - колонка
  const rowTetro = 5; //                                - рядок

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
      // const nameFigure = "O"; //! змінили захардкоджене значення на "O"
      const nameFigure = tetromino.name;
      const cellIndex = convertPositionToIndex(row, column);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();

drawPlayfield();
drawTetromino();
```

#### STEP-6

##### Обробка клавіш `onKeyDown`

для переміщення тетроміно вліво, вправо та вниз.

Додамо слухача подій до документа, на подію `keydown` - при натисканні будь-якої клавіші на клавіатурі, викликається функція `onKeyDown`.

```js
document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  console.log(event);
}
```

З консолі можемо скопіювати код при натисканні на стрілки:

```js
document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  if (event.key == "ArrowLeft") {
    tetromino.column -= 1;

    console.log(event);
  }
}
```

##### Функція `draw()`

Нічого не зміниться в браузері, потрібно перемалювати все поле, разом із фігурою:

Для цього напишемо функцію:

```js
function draw() {
  drawPlayfield();
  cells.forEach((el) => el.removeAttribute("class"));
  drawTetromino();
}
```

##### Upgraid Обробка клавіш `onKeyDown`

```js
function onKeyDown(event) {
  if (event.key == "ArrowLeft") {
    tetromino.column -= 1;

    console.log(event);
  }
  if (event.key == "ArrowRight") {
    tetromino.column += 1;
  }
  if (event.key == "ArrowDown") {
    tetromino.row += 1;
  }
  draw();
}
```

##### Колізії (COLLISIONS)

```js
function isOutsideOfGameboard(row, column) {
  console.log(row);
  console.log(PLAYFILED_ROWS - tetromino.matrix.length);
  return; //!   !!!типова помилка - return ; !!! не потрібно ' ; ';
  column < 0 ||
    column > PLAYFILED_COLUMNS - tetromino.matrix.length ||
    row + tetromino.matrix.length > PLAYFILED_ROWS - 1;
}
```

**Логіка роботи isOutsideOfGameboard:**<br><br>

1. Перевірка координат тетроміно:<br><br>

- `row`: Поточний рядок тетроміно.
- `column`: Поточна колонка тетроміно.<br><br>

2. Перевірка виходу за межі:<br><br>

- `column < 0`: Якщо колонка менша за 0, тетроміно виходить за ліву межу поля.
- `column > PLAYFILED_COLUMNS - tetromino.matrix.length`: Якщо колонка більша за кількість колонок мінус довжина матриці тетроміно, тетроміно виходить за праву межу поля.
- `row + tetromino.matrix.length > PLAYFILED_ROWS - 1`: Якщо рядок плюс довжина матриці тетроміно більша за кількість рядків мінус 1, тетроміно виходить за нижню межу поля.<br><br>

3. Повернення результату перевірки:<br><br>

- Якщо будь-яка з умов є істинною, функція повертає `true`, що означає, що тетроміно виходить за межі ігрового поля.
- Якщо жодна з умов не є істинною, функція повертає `false`.<br><br>

##### Upgraid Обробка клавіш `onKeyDown`

```js
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
```

**Логіка роботи `onKeyDown`:**<br><br>

1. Слухач події `keydown`:<br><br>

При натисканні будь-якої клавіші на клавіатурі викликається функція `onKeyDown`.<br><br>

2. Обробка натискань клавіш:<br><br>

- Якщо натиснута клавіша — стрілка вліво (`ArrowLeft`):
  `tetromino.column -= 1`: Зменшується колонка тетроміно, тобто воно зміщується вліво.
  Перевірка виходу за межі поля:
  `isOutsideOfGameboard(tetromino.row, tetromino.column)`: Якщо тетроміно виходить за межі поля, колонка повертається назад (`tetromino.column += 1`).<br><br>

- Якщо натиснута клавіша — стрілка вправо (`ArrowRight`):
  `tetromino.column += 1`: Збільшується колонка тетроміно, тобто воно зміщується вправо.
  Перевірка виходу за межі поля:
  `isOutsideOfGameboard(tetromino.row, tetromino.column)`: Якщо тетроміно виходить за межі поля, колонка повертається назад (`tetromino.column -= 1`).<br><br>

- Якщо натиснута клавіша — стрілка вниз (`ArrowDown`):
  `tetromino.row += 1`: Збільшується рядок тетроміно, тобто воно зміщується вниз.
  Перевірка виходу за межі поля:
  `isOutsideOfGameboard(tetromino.row, tetromino.column)`: Якщо тетроміно виходить за межі поля, рядок повертається назад (`tetromino.row -= 1`).<br><br>

3. Перемальовка тетроміно:<br><br>

`draw()`: Викликається функція для перемальовки ігрового поля та тетроміно на нових позиціях.

##### Стилі

```css
.tetris .O {
  background: red;
}

.tetris .L {
  background: green;
}

.tetris .J {
  background: purple;
}

.tetris .T {
  background: blue;
}

.tetris .I {
  background: yellow;
}

.tetris .S {
  background: aqua;
}

.tetris .Z {
  background: brown;
}
```

##### `randomFigure`

```js
function randomFigure(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
```

`Math.random()`: Генерує випадкове число від 0 (включно) до 1 (не включно). Наприклад, значення може бути 0.567, 0.123 тощо.

`Math.random() * array.length`: Множимо випадкове число на довжину масиву. Це дає випадкове число від 0 до довжини масиву (але не включаючи довжину). Наприклад, якщо довжина масиву 7, результат може бути будь-яке число від 0 до 6.999.

`Math.floor(...)`: Округлює число вниз до **_найближчого цілого числа_**. Це гарантує, що ми отримуємо ціле число в діапазоні від `0` до `array.length - 1`. Наприклад, 6.999 стає 6, 0.123 стає 0 і т.д.

Таким чином, `randomIndex` буде випадковим індексом масиву `array`.

`Math.random() * array.length` генерує значення у діапазоні `[0, array.length)`. Однак, всі інтервали мають однакову довжину, що забезпечує рівні шанси для кожного індексу.

1. 0-й елемент буде обраний, якщо `Math.random() * array.length` дасть значення в діапазоні `[0, 1)`.
2. 1-й елемент буде обраний, якщо `Math.random() * array.length` дасть значення в діапазоні `[1, 2)`.

...

7. 6-й елемент буде обраний, якщо `Math.random() * array.length` дасть значення в діапазоні `[6, 7)`.

**Чому ймовірності рівні**

Припустимо, що ми використовуємо масив з 7 елементів.
Ймовірність потрапити у діапазон: `[0, 1) = 1/7 ≈ 0.142857`

##### `generateTetromino()`

Підставляємо змінні замість хардкоду:

```js
const nameTetro = randomFigure(TETROMINO_NAMES);
const matrix = TETROMINOES[nameTetro];
```

##### Центрування фігури (незалежно від ширини ігрового поля)

Код гарантує, що тетроміно з'явиться по центру ігрового поля по горизонталі. Початкова колонка обчислюється шляхом віднімання половини довжини тетроміно від середини ігрового поля та округленням результату вниз до найближчого цілого числа.

```js
const columnTetro = Math.floor(PLAYFILED_COLUMNS / 2 - matrix.length / 2);
```

Це обчислення робить так, щоб тетроміно з'явилося по центру ігрового поля, з урахуванням його власної ширини, що створює гармонійне та зручне розміщення для подальшої гри.

##### Добавимо в кінці коду `draw()`

```js
draw(); // без виклику цієї ф-ції відмальовуватися фігура буде тільки після натискання на будь-яку клавішу
```

Функція `draw()` відповідає за відображення як статичного ігрового поля, так і активного тетроміно. Вона викликає дві інші функції: `drawPlayfield()` та `drawTetromino()`, які власне і малюють поле і тетроміно відповідно.<br><br>

Якщо `draw()` не викликається після початкової генерації ігрового поля і тетроміно, то ігрове поле буде відмальоване, але сам тетроміно не з'явиться на екрані, поки не буде оброблено перше натискання клавіші (що викличе функцію `onKeyDown` та, у свою чергу, виклик функції `draw()`).<br><br>

Тобто, якщо виклик `draw()` відсутній, фігура буде відмальовуватись тільки після натискання будь-якої клавіші (ініціює перший виклик` draw()` через функцію `onKeyDown`).<br><br>

Щоб фігура була відмальована одразу після генерації, необхідно викликати `draw()` після генерації ігрового поля та тетроміно. Ось правильний порядок викликів:<br><br>

```js
generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();
draw(); // Викликаємо draw() тут, щоб одразу намалювати тетроміно
```

Це гарантує, що фігура буде відмальована одразу після запуску програми, і не буде потрібно натискати клавішу для її першого відображення.

###### Чи потрібно знімати слухача?

У більшості випадків не потрібно знімати слухача подій, якщо ви хочете, щоб програма реагувала на клавіші протягом всієї гри.
Слухач подій для клавіш (`document.addEventListener('keydown', onKeyDown)`) дозволяє вашим фігурам рухатись вліво, вправо та вниз під час гри.

Однак, є випадки, коли знімати слухача може бути необхідно:

1. **Коли гра закінчується:**
   Після того, як гра закінчиться (наприклад, коли тетроміно досягає верхньої частини ігрового поля), можна зняти слухача подій, щоб запобігти подальшим діям гравця.

2. **Пауза гри:**
   Якщо є функціональність паузи гри, можна тимчасово зняти слухача подій під час паузи і знову додати його, коли гра відновиться.

3. _Зміна режиму гри:_
   Якщо додаток підтримує різні режими гри, то можна знімати і додавати слухачів подій відповідно до поточного режиму.

Щоб зняти слухача подій, використовують метод `removeEventListener`:

```js
document.removeEventListener("keydown", onKeyDown);
```

Наприклад, знімаємо слухача подій, коли гра закінчується:

```js
function endGame() {
  // Логіка завершення гри
  alert("Гра закінчена!");
  document.removeEventListener("keydown", onKeyDown); // Знімаємо слухача подій
}
```

І якщо вам потрібно додати його знову (наприклад, після перезапуску гри):

```js
function startGame() {
  // Логіка початку гри
  generatePlayfield();
  let cells = document.querySelectorAll(".tetris div");
  generateTetromino();
  draw();
  document.addEventListener("keydown", onKeyDown); // Додаємо слухача подій
}
```

Загалом, якщо у грі немає функціональності паузи чи завершення гри, слухача подій можна залишити активним протягом всього часу роботи програми.

#### STEP-7 / Lesson-3

##### Логіка

1. **Оголошення констант та змінних:**

- `PLAYFILED_COLUMNS` і `PLAYFILED_ROWS` задають розміри ігрового поля.
- `TETROMINO_NAMES` і `TETROMINOES` містять назви та форми тетроміно.
- `playfield` — це масив, який представляє ігрове поле.
- `tetromino` містить інформацію про поточне активне тетроміно (його назву, матрицю, стовпець і рядок).

2. **Функції спільного призначення:**

- `convertPositionToIndex(row, col)` перетворює координати (рядок, стовпець) у одновимірний індекс для доступу до елементів масиву, що представляють ігрове поле.
- `randomFigure(array)` повертає випадковий елемент із переданого масиву.

3. **Генерація тетроміно та ігрового поля:**

- `generateTetromino()` обирає випадкове тетроміно, розраховує його початкові координати та зберігає в об'єкті `tetromino`.
- `generatePlayfield()` створює `DOM-елементи` для ігрового поля і ініціалізує масив `playfield` нулями (порожніми клітинками).

4. **Обробка натискань клавіш:**<br><br>

- `document.addEventListener("keydown", onKeyDown)` прив'язує обробник подій `onKeyDown` до подій натискання клавіш.<br>
- `onKeyDown(event)` обробляє натискання клавіш (стрілок), змінюючи координати `tetromino` і перевіряє, чи нова позиція допустима за допомогою `isValid()`. Якщо позиція недопустима, повертає тетроміно на попередню позицію.<br><br>

5. **Валідація та перевірка зіткнень:**<br><br>

- `isValid()` перевіряє, чи нова позиція тетроміно допустима, перебираючи всі елементи матриці тетроміно і викликаючи `isOutsideOfGameboard(row, column)`.
- `isOutsideOfGameboard(row, column)` перевіряє, чи виходить елемент тетроміно за межі ігрового поля.<br><br>

6. **Малювання тетроміно та ігрового поля:**<br><br>

- `draw()` очищує попередні класи всіх клітинок і викликає `drawPlayfield()` і `drawTetromino()` для оновлення ігрового поля та поточного тетроміно.<br>
- `drawTetromino()` малює поточне активне тетроміно на ігровому полі, додаючи відповідні класи до `DOM-елементів`.<br>
- `drawPlayfield()` малює статичні елементи ігрового поля, додаючи відповідні класи до `DOM-елементів` на основі стану `playfield`.<br><br>

7. **Початкова ініціалізація:**<br><br>

- `generatePlayfield()` створює ігрове поле та ініціалізує масив `playfield`.<br>
- `let cells = document.querySelectorAll(".tetris div");` отримує всі клітинки ігрового поля в `DOM`.<br>
- `generateTetromino()` генерує початкове тетроміно.<br>
- `draw()` малює початкове ігрове поле та тетроміно.<br><br>

**Координати поточного місцезнаходження фігури**<br><br>

Координати поточного місцезнаходження тетроміно зберігаються в об'єкті tetromino у властивостях `row `і `column`. Ось як це працює:

1. **Початкова генерація:**<br><br>

При створенні нового тетроміно в функції `generateTetromino()`, початкові координати задаються через `columnTetro` та `rowTetro`, які потім присвоюються властивостям `column` і `row` об'єкта `tetromino`.

2. **Рух фігури:**<br><br>

- При натисканні клавіш (`ArrowLeft`, `ArrowRight`, `ArrowDown`), координати `column` та `row` змінюються відповідно до напрямку руху.
- Після зміни координат перевіряється їх валідність за допомогою функції `isValid()`. Якщо нова позиція недопустима, координати повертаються до попередніх значень.

3. **Малювання фігури:**<br><br>

- Ф-ція `drawTetromino()` використовує поточні значення `row` і `column` для визначення позиції фігури на ігровому полі.
- Значення `row` і `column` додаються до індексів матриці тетроміно для розрахунку позиції кожного елемента тетроміно в масиві `cells`.

Таким чином, зміна координат у властивостях `row` і `column` об'єкта `tetromino` дозволяє відслідковувати поточне місцезнаходження фігури на ігровому полі та оновлювати його при кожному русі.

##### Основні зміни

1. **Оновлення обробки клавіш та додавання ротації:**

- Додано нові функції для руху тетроміно вліво, вправо та вниз (`moveTetrominoLeft`, `moveTetrominoRight`, `moveTetrominoDown`).
- Додано ротацію тетроміно через обробку клавіші `ArrowUp` і функцію `rotate`.

2. **Оновлення функцій перевірки колізій:**

- Додано функцію `isValid` для перевірки валідності позиції тетроміно.
- Функції `isOutsideOfGameboard` та `hasCollisions` тепер використовуються в `isValid`.

3. **Механізм ротації тетроміно:**

- Додано функції `rotateTetromino` та `rotateMatrix` для обертання тетроміно.
- Додано перевірку валідності після обертання. Якщо нова позиція не валідна, тетроміно повертається до попередньої матриці.

4. **Розміщення тетроміно на ігровому полі:**

- Додано функцію `placeTetromino` для фіксації тетроміно на ігровому полі, коли воно не може рухатися вниз.
- Після розміщення активного тетроміно генерується нове тетроміно.

**Основні зміни:**

- Додано функції для руху тетроміно в різні напрямки та обертання.<br>
- Покращено обробку колізій для більш плавної гри.<br>
- Додано ротацію тетроміно та відповідні перевірки.<br>
- Додано розміщення тетроміно на ігровому полі та генерацію нового тетроміно після завершення руху поточного.<br>

##### Перевірка валідності позиції тетроміно `isValid`

Ф-ція `isValid` перевіряє, чи є поточне положення тетроміно допустимим в ігровому полі **Тетрісу** - чи можна розмістити тетроміно в поточному положенні на ігровому полі без виходу за межі ігрового поля і без колізій з іншими тетроміно.<br>
Використовує два підходи для перевірки валідності тетроміно: перевірка меж і перевірка на колізії.

```js
// Перевірка валідності позиції тетроміно
function isValid() {
  const matrixSize = tetromino.matrix.length; // Розмір матриці тетроміно (кількість рядків або стовпців)

  // Перебираємо всі клітинки матриці тетроміно
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      // Перевірка, чи виходить частина тетроміно за межі ігрового поля
      if (isOutsideOfGameboard(row, column)) {
        return false; // Якщо виходить, повертаємо false (тоді тетроміно невалідне)
      }
      // Перевірка, чи є колізії з іншими тетроміно на полі
      if (hasCollisions(row, column)) {
        return false; // Якщо є колізії, повертаємо false (тоді тетроміно невалідне)
      }
    }
  }

  // Якщо жодна з перевірок не виявила проблем, повертаємо true
  return true;
}
```

1. **Отримання розміру матриці тетроміно**

```js
const matrixSize = tetromino.matrix.length;
```

- `tetromino.matrix` — це двовимірний масив, що представляє форму тетроміно. Кожен рядок в цьому масиві представляє рядок матриці тетроміно.<br>
- `matrixSize` — розмір матриці (кількість рядків або стовпців), так як у формі тетроміно завжди квадратна матриця.<br><br>

2. **Перебір усіх клітинок матриці тетроміно**

```js
   for(let row = 0; row < matrixSize; row++){
       for(let column = 0; column < matrixSize; column++){
```

Два вкладені цикли перебирають всі клітинки матриці тетроміно. Зовнішній цикл перебирає рядки, а внутрішній — стовпці.

3. **Перевірка виходу за межі ігрового поля**

```js
if (isOutsideOfGameboard(row, column)) {
  return false;
}
```

- `isOutsideOfGameboard(row, column)` — ф-ція, що перевіряє, чи частина тетроміно виходить за межі ігрового поля.<br><br>

> - `isOutsideOfGameboard` перевіряє, чи знаходиться клітинка тетроміно в межах ігрового поля (порівнює координати клітинки з межами поля).<br>
> - Якщо так, то ф-ція `isValid` повертає `false`, що означає, що позиція тетроміно невалідна.<br><br>

4. **Перевірка на колізії з іншими тетроміно**

```js
if (hasCollisions(row, column)) {
  return false;
}
```

`hasCollisions(row, column)` — ф-ція, що перевіряє, чи тетроміно перекривається з іншими тетроміно на ігровому полі.

> - `hasCollisions` перевіряє, чи є тетроміно в поточній позиції на ігровому полі (визначається через `playfield`), де вже є інше тетроміно.
> - Якщо є колізії, то `isValid` повертає `false`.

5. **Повернення результату перевірки**

```js
return true;
```

- Якщо жодна з перевірок не знайшла проблем, ф-ція повертає `true` - позиція тетроміно є валідною для ігрового поля.<br><br>

###### Повний код функцій перевірки

Функції `isOutsideOfGameboard` та `hasCollisions`, які використовуються в `isValid`:

```js
// Перевірка виходу за межі ігрового поля
function isOutsideOfGameboard(row, column) {
  return (
    tetromino.matrix[row][column] &&
    (tetromino.row + row >= PLAYFILED_ROWS ||
      tetromino.column + column < 0 ||
      tetromino.column + column >= PLAYFILED_COLUMNS)
  );
}

// Перевірка колізій з іншими фігурами
function hasCollisions(row, column) {
  return (
    tetromino.matrix[row][column] &&
    playfield[tetromino.row + row]?.[tetromino.column + column]
  );
}
```

- `tetromino.row` - це координата верхнього рядка тетроміно на ігровому полі.<br>
- `row` - це індекс рядка в матриці тетроміно.<br><br>

Перевірка, чи елемент активний:

`tetromino.matrix[row][column]` перевіряє, чи є цей елемент частиною тетроміно (ненульовим).

**Приклад використання**<br><br>

Припустимо, у нас є тетроміно з матрицею:

```js
[
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
];
```

і координати `tetromino.row = 18` та `tetromino.column = 8` на ігровому полі `20x10`.<br><br>

Елемент з координатами `row = 0`, `column = 1` перевіряється:<br>

> `tetromino.matrix[0][1]` дорівнює `1` (активний елемент).<br> > `tetromino.row + 0` дорівнює `18`, що не перевищує `19`.<br> > `tetromino.column + 1` дорівнює `9`, що не перевищує `9`.<br><br>

> Цей елемент в межах ігрового поля.<br><br>

Елемент з координатами `row = 1`, `column = 0` перевіряється:<br>

> `tetromino.matrix[1][0]` дорівнює `1` (активний елемент).<br> > `tetromino.row + 1` дорівнює `19`, що не перевищує `19`.<br> > `tetromino.column + 0` дорівнює `8`, що не менше `0`.<br><br>

> Цей елемент в межах ігрового поля.<br><br>

Елемент з координатами `row = 1`, `column = 1` перевіряється:<br>

> `tetromino.matrix[1][1] `дорівнює 1 (активний елемент).<br> > `tetromino.row + 1` дорівнює 19, що не перевищує 19.<br> > `tetromino.column + 1` дорівнює 9, що не перевищує 9.<br><br>

> Цей елемент в межах ігрового поля.

Елемент з координатами `row = 1`, `column = 2` перевіряється:<br>

> `tetromino.matrix[1][2]` дорівнює `1` (активний елемент).<br> > `tetromino.row + 1` дорівнює `19`, що не перевищує `19`.<br> > `tetromino.column + 2` дорівнює `10`, що перевищує `9`.<br><br>

> Цей елемент виходить за праву межу ігрового поля, тому ф-ція поверне `true`.<br><br>

Отже ф-ція `isOutsideOfGameboard` дозволяє перевіряти кожен елемент тетроміно на вихід за межі ігрового поля.<br><br>

**перевірка на ненульове значення `tetromino.matrix[row][column]`**
Нульові значення у матриці тетроміно позначають порожні місця, які не є частиною фігури.
Розглянемо рядки та стовпці матриці "T":

1. Перший рядок:

   > `[0, 1, 0]`
   > Середній елемент є частиною тетроміно, тоді як перший та третій елементи є порожніми місцями.

2. Другий рядок:

   > `[1, 1, 1]`
   > Усі елементи є частинами тетроміно.

3. Третій рядок:

   > `[0, 0, 0]`
   > Усі елементи є порожніми місцями.

Якщо `tetromino.matrix[row][column]` дорівнює `0`, вираз стає `false`, і далі перевірки (вихід за межі або колізія) не виконуються для цього елемента, - ф-ція негайно повертає `false` для цього елемента.

##### Змінимо порядок виконання команд в `draw()`

```js
function draw() {
  cells.forEach((el) => el.removeAttribute("class")); // Очищення попередніх класів
  drawPlayfield(); // Відображення статичного ігрового поля
  drawTetromino(); // Відображення активного тетроміно
}
```

##### Fix error. Важливість повернення `true` в ф-ції `isValid`

- Якщо ф-ція `isValid` не має `return true` в кінці, вона нічого не повертає в такому випадку, - це означає повернення `undefined`. В результаті, логіка обробки натискань клавіш завжди буде вважати, що поточна позиція тетроміно недопустима, оскільки `undefined` в умовах `if (!isValid())` інтерпретується як `false`.
- Тобто, навіть якщо позиція тетроміно допустима, `if (!isValid())` завжди повертає `true` (бо `!undefined` є `true`), і тетроміно повертається на попередню позицію.

##### Ф-ція `moveTetromino`

Винесемо код в окрему ф-цію:

```js
// function onKeyDown(event) {
//   if (event.key == "ArrowLeft") {
//     tetromino.column -= 1; // Рух вліво
//     // console.log("ArrowLeft");
//     if (!isValid()) {
//       tetromino.column += 1; // Повернення назад, якщо вийшли за межі
//     }
//   }
//   if (event.key == "ArrowRight") {
//     tetromino.column += 1; // Рух вправо
//     if (!isValid()) {
//       tetromino.column -= 1; // Повернення назад, якщо вийшли за межі
//     }
//   }
//   if (event.key == "ArrowDown") {
//     tetromino.row += 1; // Рух вниз
//     if (!isValid()) {
//       tetromino.row -= 1; // Повернення назад, якщо вийшли за межі
//     }
//   }
//   draw(); // Перерисовка поля та тетроміно
// }

function onKeyDown(event) {
  if (event.key == "ArrowLeft") {
    moveTetrominoLeft();
  }
  if (event.key == "ArrowRight") {
    moveTetrominoRight();
  }
  if (event.key == "ArrowDown") {
    moveTetrominoDown();
  }
  draw();
}

function moveTetrominoDown() {
  tetromino.row += 1;
  if (!isValid()) {
    tetromino.row -= 1;
    placeTetromino();
  }
}

function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (!isValid()) {
    tetromino.column += 1;
  }
}

function moveTetrominoRight() {
  tetromino.column += 1;
  if (!isValid()) {
    tetromino.column -= 1;
  }
}
```

##### Ф-ція `placeTetromino()`

відповідає за розміщення поточного тетроміно на ігровому полі після того, як воно не може рухатися далі вниз. Вона додає значення тетроміно до масиву `playfield`, який представляє ігрове поле, і викликає функцію `generateTetromino()`, щоб створити нове тетроміно.

```js
// Функція для розміщення тетроміно на полі
function placeTetromino() {
  // Визначаємо розмір матриці поточного тетроміно:
  const tetrominoMatrixSize = tetromino.matrix.length;
  // Перебираємо всі комірки матриці тетроміно:
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      // Якщо комірка матриці не порожня, додаємо значення тетроміно до ігрового поля:
      if (tetromino.matrix[row][column]) {
        playfield[tetromino.row + row][tetromino.column + column] =
          tetromino.name;
      }
    }
  }
  // Після розміщення всіх комірок тетроміно на ігровому полі, виводимо оновлений стан ігрового поля в консоль:
  console.log(playfield);
  generateTetromino(); // Генерація нового тетроміно
}
```

Це означає, що значення комірки тетроміно (яке не дорівнює нулю) присвоюється відповідній комірці в масиві `playfield`, що відображає розташування фігури на ігровому полі.

**Логіка ф-ції**

Змінні `row` і `column` вказують на координати всередині матриці тетроміно, а не на ігровому полі. Розглянемо це детальніше.

Коли ми виконуємо `playfield[tetromino.row + row][tetromino.column + column] = tetromino.name`, ми фактично переносимо координати всередині матриці тетроміно до глобальних координат на ігровому полі. Це досягається шляхом додавання поточних координат тетроміно (`tetromino.row` та `tetromino.column`) до внутрішніх координат (`row` та `column`).

Детальніше:

`tetromino.row` і `tetromino.column` визначають верхній лівий кут матриці тетроміно на ігровому полі.
`row` і `column` проходять по всіх елементах матриці тетроміно.
Додаючи `tetromino.row` до `row` і `tetromino.column` до `column`, ми отримуємо відповідні координати на ігровому полі, де повинні розміститися елементи тетроміно.
Ось приклад, як це працює:

Припустимо, у нас є фігура "O" (квадрат) з матрицею:

```js
[
  [1, 1],
  [1, 1],
];
```

Ця фігура розташована на ігровому полі з початковими координатами `tetromino.row = 5` і `tetromino.column = 3`. Тобто верхній лівий кут цієї фігури знаходиться на полі за координатами `(5, 3)`.

Коли ми проходимо через всі елементи матриці тетроміно, ми маємо такі значення row і column:

- `row = 0, column = 0`: елемент `[0][0]` матриці тетроміно розміщується на полі за координатами `(5 + 0, 3 + 0)` = `(5, 3)`.
- `row = 0, column = 1`: елемент `[0][1]` матриці тетроміно розміщується на полі за координатами `(5 + 0, 3 + 1)` = `(5, 4)`.
- `row = 1, column = 0`: елемент `[1][0]` матриці тетроміно розміщується на полі за координатами `(5 + 1, 3 + 0)` = `(6, 3)`.
- `row = 1, column = 1`: елемент `[1][1]` матриці тетроміно розміщується на полі за координатами `(5 + 1, 3 + 1)` = `(6, 4)`.

Таким чином, всі елементи фігури `"O"` правильно розміщуються на ігровому полі відповідно до її позиції.

---

  <br>

```js

```
