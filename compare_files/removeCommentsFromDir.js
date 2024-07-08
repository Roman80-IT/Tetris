const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів

// Функція для видалення коментарів з коду
function removeComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
}

const directory = "my_folder"; //! Назва потрібної папки
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

//! Якщо директорія є кореневою, - можна використовувати змінну '__dirname', яка вказує на поточну директорію,
//!      в якій знаходиться виконуваний файл.
//!      Це найкращий підхід для роботи з файлами в поточній директорії або в піддиректоріях.

// const fs = require("fs"); // Підключаємо модуль 'fs' для роботи з файловою системою
// const path = require("path"); // Підключаємо модуль 'path' для роботи з шляхами файлів

// // Функція для видалення коментарів з коду
// function removeComments(code) {
//   return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();
// }

// // Використовуємо __dirname для роботи з файлами у поточній директорії
// const filePath = path.join(__dirname, "scripts.js"); // Визначаємо шлях до файлу 'scripts.js' в поточній директорії

// // Зчитуємо вміст файлу 'scripts.js' асинхронно
// fs.readFile(filePath, "utf8", (err, data) => {
//   // Якщо сталася помилка при зчитуванні файлу, виводимо її в консоль
//   if (err) {
//     console.error("Error reading the file:", err);
//     return; // Припиняємо виконання функції, якщо сталася помилка
//   }

//   // 'data' містить вміст файлу 'scripts.js'
//   const codeWithoutComments = removeComments(data); // Видаляємо коментарі з вмісту файлу

//   const outputFilePath = path.join(__dirname, "scripts_without_comments.js"); // Визначаємо шлях до нового файлу в поточній директорії
//   // Записуємо очищений від коментарів код у новий файл
//   fs.writeFile(outputFilePath, codeWithoutComments, "utf8", (err) => {
//     // Якщо сталася помилка при записі файлу, виводимо її в консоль
//     if (err) {
//       console.error("Error writing the file:", err);
//       return; // Припиняємо виконання функції, якщо сталася помилка
//     }

//     // Виводимо повідомлення про успішне збереження очищеного коду у файл
//     console.log("Comments removed and output saved to", outputFilePath);
//   });
// });
