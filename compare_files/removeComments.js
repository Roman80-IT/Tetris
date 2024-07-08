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
