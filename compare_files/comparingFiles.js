function compareFiles(file1, file2) {
  const code1 = removeComments(file1);
  const code2 = removeComments(file2);

  return code1 === code2;
}

const file1 = `...`; // вставте тут увесь код з файлу 1
const file2 = `...`; // вставте тут увесь код з файлу 2

console.log(compareFiles(file1, file2)); // поверне true, якщо файли ідентичні
