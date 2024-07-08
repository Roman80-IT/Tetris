## Перевірка ідентичності двох файлів коду (без урахування коментарів)

Видаляємо всі коментарі та порівнюємо результати:

Ф-ція для видалення коментарів з **JavaScript** коду:

```js
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}
```

Застосуємо цю ф-цію до обох файлів

Тепер порівняємо файли:

```js
function compareFiles(file1, file2) {
  const code1 = removeComments(file1);
  const code2 = removeComments(file2);

  return code1 === code2;
}

const file1 = `...`; // вставте тут весь код з файлу 1
const file2 = `...`; // вставте тут весь код з файлу 2

console.log(compareFiles(file1, file2)); // поверне true, якщо файли ідентичні
```

Якщо коди після видалення коментарів ідентичні, значення буде `true`, в іншому випадку - `false`.

## Робота з файлами

Щоб застосувати функцію `removeComments` до цілого файлу `scripts.js` в проекті,-

створимо новий файл для `Node.js - скрипту`, наприклад, `removeComments.js` в кореневій директорії проекту:

```js
const fs = require("fs");
const path = require("path");

function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

const filePath = path.join(__dirname, "scripts.js");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const codeWithoutComments = removeComments(data);

  const outputFilePath = path.join(__dirname, "scripts_without_comments.js");
  fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    console.log("Comments removed and output saved to", outputFilePath);
  });
});
```

Запускаємо скрипт з командного рядка:

```
node removeComments.js
```

Цей скрипт прочитає файл `scripts.js`, видалить коментарі, а потім збереже результат в новому файлі `scripts_without_comments.js` в тій же директорії.

Це дозволить побачити результат без коментарів без зміни оригінального файлу.

### Пояснення коду:

```js
const fs = require("fs"); // Імпортуємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Імпортуємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
  // Використовуємо регулярний вираз для видалення коментарів (як блокових, так і однорядкових)
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

const filePath = path.join(__dirname, "scripts.js"); // Визначаємо шлях до файлу 'scripts.js' в поточній директорії

// Читаємо файл 'scripts.js' з кодуванням 'utf8'
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    // Перевіряємо на наявність помилки при читанні файлу
    console.error("Error reading the file:", err); // Виводимо повідомлення про помилку, якщо вона є
    return; // Завершуємо виконання функції у випадку помилки
  }

  const codeWithoutComments = removeComments(data); // Викликаємо функцію removeComments для видалення коментарів з прочитаного коду

  const outputFilePath = path.join(__dirname, "scripts_without_comments.js"); // Визначаємо шлях до файлу, в який будемо записувати результат
  // Записуємо очищений від коментарів код у новий файл
  fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
    if (err) {
      // Перевіряємо на наявність помилки при записі файлу
      console.error("Error writing the file:", err); // Виводимо повідомлення про помилку, якщо вона є
      return; // Завершуємо виконання функції у випадку помилки
    }

    // Виводимо повідомлення про успішне збереження результату
    console.log("Comments removed and output saved to", outputFilePath);
  });
});
```

### Вказуємо вручну назву директорії (при потребі)

`__dirname` — це глобальна змінна в `Node.js`, яка завжди вказує на абсолютний шлях до директорії, в якій знаходиться виконуваний файл. Зазвичай немає потреби заміняти її на назву папки вручну. Але якщо хочемо використовувати конкретну назву папки:

- Створимо змінну для шляху до вашої директорії.
- Використовуємо цю змінну замість `__dirname`.
  Наприклад, якщо папка називається `my_folder`, робимо так:

```js
const fs = require("fs");
const path = require("path");

function removeComments(code) {
  return code.replace(/\/\*[\s\S]_?\*\/|\/\/._/g, "").trim();
}

const directory = "my_folder"; //! Назва папки
const filePath = path.join(directory, "scripts.js"); // Визначаємо шлях до файлу 'scripts.js' в вказаній папці

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const codeWithoutComments = removeComments(data);

  const outputFilePath = path.join(directory, "scripts_without_comments.js"); // Визначаємо шлях до нового файлу в вказаній папці
  fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    console.log("Comments removed and output saved to", outputFilePath);
  });
});
```

В цьому прикладі змінна `directory` містить назву папки, і шлях до файлу визначається за допомогою `path.join(directory, 'scripts.js')`. Аналогічно для шляху до файлу без коментарів.

#### Поясненняя до коду

```js
const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

const directory = "my_folder"; // Назва вашої папки
const filePath = path.join(directory, "scripts.js"); // Визначаємо шлях до файлу 'scripts.js' в вказаній папці

// Зчитуємо вміст файлу 'scripts.js' асинхронно
fs.readFile(filePath, "utf8", (err, data) => {
  // Якщо сталася помилка при зчитуванні файлу, виводимо її в консоль
  if (err) {
    console.error("Error reading the file:", err);
    return; // Припиняємо виконання функції, якщо сталася помилка
  }

  // 'data' містить вміст файлу 'scripts.js'
  const codeWithoutComments = removeComments(data); // Видаляємо коментарі з вмісту файлу

  const outputFilePath = path.join(directory, "scripts_without_comments.js"); // Визначаємо шлях до нового файлу в вказаній папці
  // Записуємо очищений від коментарів код у новий файл
  fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
    // Якщо сталася помилка при записі файлу, виводимо її в консоль
    if (err) {
      console.error("Error writing the file:", err);
      return; // Припиняємо виконання функції, якщо сталася помилка
    }

    // Виводимо повідомлення про успішне збереження очищеного коду у файл
    console.log("Comments removed and output saved to", outputFilePath);
  });
});
```

#### коренева директорія

Якщо директорія є кореневою, можна використовувати змінну `__dirname`, яка вказує на поточну директорію, в якій знаходиться виконуваний файл. Це найкращий підхід для роботи з файлами в поточній директорії або в піддиректоріях.

```js
onst fs = require('fs'); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require('path'); // Підключаємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
    return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
}

// Використовуємо __dirname для роботи з файлами у поточній директорії
const filePath = path.join(__dirname, 'scripts.js'); // Визначаємо шлях до файлу 'scripts.js' в поточній директорії

// Зчитуємо вміст файлу 'scripts.js' асинхронно
fs.readFile(filePath, 'utf8', (err, data) => {
    // Якщо сталася помилка при зчитуванні файлу, виводимо її в консоль
    if (err) {
        console.error('Error reading the file:', err);
        return; // Припиняємо виконання функції, якщо сталася помилка
    }

    // 'data' містить вміст файлу 'scripts.js'
    const codeWithoutComments = removeComments(data); // Видаляємо коментарі з вмісту файлу

    const outputFilePath = path.join(__dirname, 'scripts_without_comments.js'); // Визначаємо шлях до нового файлу в поточній директорії
    // Записуємо очищений від коментарів код у новий файл
    fs.writeFile(outputFilePath, codeWithoutComments, 'utf8', (err) => {
        // Якщо сталася помилка при записі файлу, виводимо її в консоль
        if (err) {
            console.error('Error writing the file:', err);
            return; // Припиняємо виконання функції, якщо сталася помилка
        }

        // Виводимо повідомлення про успішне збереження очищеного коду у файл
        console.log('Comments removed and output saved to', outputFilePath);
    });
});
```

Тут `__dirname` буде автоматично вказувати на поточну директорію, де знаходиться виконуваний скрипт, що забезпечить правильне визначення шляхів до файлів у цій директорії.

### Що буде підставлено в параметр `data`?

`const codeWithoutComments = removeComments(data);`

Розглянемо, як функція `fs.readFile` працює з файлами.

Функція `fs.readFile` в `Node.js` асинхронно зчитує вміст файлу.
`fs.readFile(filePath, "utf8", (err, data)`
Вона приймає шлях до файлу як _перший аргумент_, кодування як _другий аргумент_ і ф-цію зворотного виклику (`callback`) як _третій аргумент_.

Після того як файл успішно зчитано, ф-ція зворотного виклику викликається з двома аргументами: помилкою (якщо вона виникла) і даними файлу. У цьому контексті `data` є вмістом файлу, який було зчитано.

```js
const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

const directory = "my_folder"; // Назва вашої папки
const filePath = path.join(directory, "scripts.js"); // Визначаємо шлях до файлу 'scripts.js' в вказаній папці

// Зчитуємо вміст файлу 'scripts.js' асинхронно
fs.readFile(filePath, "utf8", (err, data) => {
  // Якщо сталася помилка при зчитуванні файлу, виводимо її в консоль
  if (err) {
    console.error("Error reading the file:", err);
    return; // Припиняємо виконання функції, якщо сталася помилка
  }

  // 'data' містить вміст файлу 'scripts.js'
  const codeWithoutComments = removeComments(data); // Видаляємо коментарі з вмісту файлу

  const outputFilePath = path.join(directory, "scripts_without_comments.js"); // Визначаємо шлях до нового файлу в вказаній папці
  // Записуємо очищений від коментарів код у новий файл
  fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
    // Якщо сталася помилка при записі файлу, виводимо її в консоль
    if (err) {
      console.error("Error writing the file:", err);
      return; // Припиняємо виконання функції, якщо сталася помилка
    }

    // Виводимо повідомлення про успішне збереження очищеного коду у файл
    console.log("Comments removed and output saved to", outputFilePath);
  });
});
```

Отже, у параметр `data` буде підставлено вміст файлу `scripts.js`, зчитаного функцією `fs.readFile`. Цей вміст потім передається у ф-цію `removeComments` для видалення коментарів.

## Скрипт для порівняння файлів

Можна створити сценарій, який зчитує вміст двох файлів за вказаними шляхами, видаляє коментарі з кожного файлу, а потім порівнює очищений код:

```js
const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

// Функція для зчитування вмісту файлу і видалення коментарів
function readFileAndRemoveComments(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      callback(err);
      return;
    }
    const codeWithoutComments = removeComments(data);
    callback(null, codeWithoutComments);
  });
}

// Визначаємо шляхи до файлів
const filePath1 = path.join(__dirname, "file1.js"); // Замість 'file1.js' вкажіть шлях до першого файлу
const filePath2 = path.join(__dirname, "file2.js"); // Замість 'file2.js' вкажіть шлях до другого файлу

// Зчитуємо вміст обох файлів і видаляємо коментарі
readFileAndRemoveComments(filePath1, (err, code1) => {
  if (err) return;

  readFileAndRemoveComments(filePath2, (err, code2) => {
    if (err) return;

    // Порівнюємо очищений від коментарів код з обох файлів
    if (code1 === code2) {
      console.log("The files are identical.");
    } else {
      console.log("The files are different.");
    }
  });
});
```

Цей сценарій виконує наступні кроки:

1. Визначає шляхи до двох файлів, які потрібно порівняти.
2. Зчитує вміст кожного файлу асинхронно.
3. Видаляє коментарі з вмісту кожного файлу.
4. Порівнює очищений код з обох файлів і виводить результат порівняння в консоль.

Можна змінити `filePath1` та `filePath2` на відповідні шляхи до ваших файлів.

## Скрипт для порівняння файлів та виведення відмінностей

Щоб знайти відмінності між двома файлами і вивести їх на консоль або записати в файл, можна використовувати модуль `diff` для порівняння рядків.

Модуль diff потрібно встановити через npm:

```
npm install diff
```

Ось як реалізувати таке порівняння та відобразити різниці між двома файлами:

```js
const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів
const { diffLines } = require("diff"); // Підключаємо функцію для порівняння рядків з модуля 'diff'

// Функція для видалення коментарів з коду
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

// Функція для зчитування вмісту файлу і видалення коментарів
function readFileAndRemoveComments(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const codeWithoutComments = removeComments(data);
      resolve(codeWithoutComments);
    });
  });
}

// Визначаємо шляхи до файлів
const filePath1 = path.join(__dirname, "file1.js"); // Замість 'file1.js' вкажіть шлях до першого файлу
const filePath2 = path.join(__dirname, "file2.js"); // Замість 'file2.js' вкажіть шлях до другого файлу

// Зчитуємо вміст обох файлів і видаляємо коментарі
Promise.all([
  readFileAndRemoveComments(filePath1),
  readFileAndRemoveComments(filePath2),
])
  .then(([code1, code2]) => {
    // Порівнюємо очищений код з обох файлів
    const differences = diffLines(code1, code2);

    // Формуємо рядок для виведення різниць
    let diffOutput = differences
      .map((part) => {
        if (part.added) return `+ ${part.value}`;
        if (part.removed) return `- ${part.value}`;
        return `  ${part.value}`;
      })
      .join("");

    // Виводимо різниці в консоль
    console.log(diffOutput);

    // Записуємо різниці у файл
    const outputFilePath = path.join(__dirname, "differences.txt");
    fs.writeFile(outputFilePath, diffOutput, "utf8", (err) => {
      if (err) {
        console.error("Error writing the differences file:", err);
        return;
      }
      console.log("Differences saved to", outputFilePath);
    });
  })
  .catch((err) => {
    console.error("Error reading the files:", err);
  });
```

Зчитуємо обидва файли, видаляємо коментарі, порівнюємо очищені коди, формуємо і виводимо різниці, а також записуємо їх у файл `differences.txt`.

**Виведення різниць**

- `+` перед рядком показує, що рядок був доданий в другому файлі.
- `-` перед рядком показує, що рядок був видалений з першого файлу.
- `Пробіл` перед рядком показує, що рядок присутній в обох файлах.

**Альтернативи для більш складних порівнянь**

Якщо потрібно зробити більш складне порівняння, наприклад, з урахуванням змін у середовищі або для інтерактивного перегляду відмінностей, потрібно використати додаткові бібліотеки, таких як `diff` (вже використовується в коді), або інструментів командного рядка, таких як `diff` або `vimdiff` в `Unix-подібних системах`.

**Висновок**

Цей скрипт дозволяє вам автоматизувати процес порівняння двох файлів, видаляючи коментарі і виводячи різниці. Ви можете налаштувати його під ваші потреби, змінюючи шляхи до файлів і обробку результатів порівняння.
