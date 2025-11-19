const fs = require("fs").promises;

fs.readFile('file1.txt', 'utf-8')
  .then(data1 => {
    console.log(data1);
    return fs.readFile('file2.txt', 'utf-8');
  })
  .then(data2 => {
    console.log(data2);
    return fs.readFile('file3.txt', 'utf-8');
  })
  .then(data3 => {
    console.log(data3);
  })
  .catch(err => console.log(err));
