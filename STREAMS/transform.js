const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("movie.mp4");
const gzip = zlib.createGzip(); // TRANSFORM STREAM
const writeStream = fs.createWriteStream("movie.zip");

readStream
  .pipe(gzip)        // transform data (compress)
  .pipe(writeStream);
