const fs = require("fs").promises;

fs.readFile("file1.txt", "utf-8")
  .then(data1 => {
    console.log("File 1:", data1);
    return fs.readFile("file2.txt", "utf-8");
  })
  .then(data2 => {
    console.log("File 2:", data2);
    return fs.readFile("file3.txt", "utf-8");
  })
  .then(data3 => {
    console.log("File 3:", data3);
  })
  .catch(err => {
    console.error("Error:", err);
  });
