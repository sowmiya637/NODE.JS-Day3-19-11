const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {
  const file = fs.createWriteStream("upload.mp4"); // WRITABLE STREAM
  
  req.pipe(file); // client upload → server file
  
  file.on("finish", () => {
    res.end("File uploaded successfully!");
  });
});
