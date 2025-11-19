const fs = require("fs");
fs.readFile('file1.txt', 'utf-8', (err, data1) => {
  if (err) throw err;

  fs.readFile('file2.txt', 'utf-8', (err, data2) => {
    if (err) throw err;

    fs.readFile('file3.txt', 'utf-8', (err, data3) => {
      console.log(data1, data2, data3);
    });
  });
});
