const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const video = fs.createReadStream("sample-5s.mp4"); // READABLE STREAM  
  video.pipe(res); // send to browser
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
