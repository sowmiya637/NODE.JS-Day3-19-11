
# Node.js Streams – Concept Definition

## Overview  
This project demonstrates different use-cases of **Node.js Streams**, including:  
- A TCP server using `net` (duplex stream)  
- HTTP video streaming using file read streams (readable)  
- Compression using `zlib` (transform)  
- File upload via HTTP using writable streams  

Streams in Node.js allow you to handle data **in chunks**, which makes working with large files or continuous data more memory- and time-efficient. :contentReference[oaicite:0]{index=0}

---

## What Are Streams in Node.js?  
- A **stream** is an abstract interface for working with streaming data sources or destinations. :contentReference[oaicite:1]{index=1}  
- Instead of loading an entire data resource into memory, streams let you read or write **small pieces** (chunks) of data. :contentReference[oaicite:2]{index=2}  
- This makes them **memory efficient** (you don’t need to buffer a whole file) and **time efficient** (you can start processing data as it arrives). :contentReference[oaicite:3]{index=3}  

---

## Types of Streams  

Node.js provides four main types of streams: :contentReference[oaicite:4]{index=4}

1. **Readable**  
   - You read data from the stream.  
   - Examples: `fs.createReadStream()`, HTTP request object, TCP socket readable side. :contentReference[oaicite:5]{index=5}  
   - It has two modes: *flowing* (data is pushed via `'data'` events) and *paused* (you manually read via `.read()`). :contentReference[oaicite:6]{index=6}  

2. **Writable**  
   - You write data *to* the stream.  
   - Examples: `fs.createWriteStream()`, HTTP response object, writable side of a socket. :contentReference[oaicite:7]{index=7}  
   - It signals backpressure (if the consumer can't keep up) via return values of `.write()` and `'drain'` event. :contentReference[oaicite:8]{index=8}  

3. **Duplex**  
   - Streams that are both **readable** and **writable**.  
   - Example: `net.Socket` (TCP connection) — you can read from it (incoming data) and write to it (send data). :contentReference[oaicite:9]{index=9}  

4. **Transform**  
   - A type of duplex stream where data written is **transformed** before being read out.  
   - Example: `zlib.createGzip()` compresses data, or `zlib.createGunzip()` decompresses. :contentReference[oaicite:10]{index=10}  

---

## How Streams Work in Your Examples

### 1. **TCP Server using `net.createServer` (Duplex)**  
```js
const net = require("net");

const server = net.createServer(socket => {
  socket.on("data", msg => {
    console.log("User says:", msg.toString());
    socket.write("Got your message!");   // write (writable)
  });
});
server.listen(4000);
````

* Here, `socket` is a **duplex stream** — it’s *readable* (you get data from the client) and *writable* (you can send data back).

---

### 2. **HTTP Video Streaming (Readable + Writable)**

```js
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const video = fs.createReadStream("sample-5s.mp4"); // Readable stream  
  video.pipe(res); // Pipe it to the HTTP response (Writable)  
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

* `fs.createReadStream(...)` creates a **readable stream** from the video file.
* `res` (HTTP response) acts as a **writable stream**.
* Using `.pipe()`, you connect (or “pipe”) the readable stream to the writable one. This handles data flow and backpressure automatically. ([Node.js][1])

---

### 3. **Compression with `zlib` (Transform Stream)**

```js
const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("movie.mp4");
const gzip = zlib.createGzip(); // Transform stream  
const writeStream = fs.createWriteStream("movie.zip");

readStream
  .pipe(gzip)        // compress data as it flows  
  .pipe(writeStream);
```

* `readStream` is **readable** (source: the original file).
* `gzip` is a **transform stream**: it takes input, compresses, and outputs compressed data.
* `writeStream` is **writable**: it writes compressed data to `movie.zip`.

---

### 4. **Uploading File via HTTP (Writable Stream)**

```js
const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {
  const file = fs.createWriteStream("upload.mp4"); // Writable stream  

  req.pipe(file); // Pipe the request data (readable) into the file (writable)  

  file.on("finish", () => {
    res.end("File uploaded successfully!");
  });
});
```

* Here, `req` (incoming HTTP request) is a **readable stream** — it represents the data coming from the client.
* `file` is a **writable stream** — it writes uploaded data to disk.
* `.pipe()` connects them, so data flows from the client request into the file, in chunks, without buffering the whole file in memory.

---

## Key Concepts & Advantages of Streams

1. **Memory Efficiency**

   * Streams help you process **large files or data** without loading the entire content into memory. ([GeeksforGeeks][2])

2. **Time Efficiency**

   * You can start processing data immediately when a chunk arrives, instead of waiting for all data. ([NodeSource][3])

3. **Composability**

   * You can use `.pipe()` to connect different types of streams: readable → transform → writable. This builds a data processing pipeline. ([NodeSource][3])

4. **Backpressure Handling**

   * Streams handle backpressure: if the writable side is slower, the readable source can pause. ([NodeBook][4])

5. **Event-driven**

   * Streams use events (`data`, `end`, `error`, `finish`, etc.) to manage data flow. ([W3Schools][5])

---

## Best Practices

* When piping multiple streams, consider using `stream.pipeline()` for **safer error handling** and automatic cleanup. ([Node.js][1])
* Always handle `'error'` events on streams — if not, you may leak resources or crash.
* Use transform streams when you need to **modify or transform** data (e.g., compression, encryption).
* For duplex streams (like sockets), be mindful that both ends operate independently.

---

Streams are a powerful and efficient way to work with data in Node.js. Your examples span most of the important types:

* **Duplex** (TCP socket)
* **Readable → Writable** (video streaming, upload)
* **Readable → Transform → Writable** (compression)

Using streams helps you build scalable, performant, and memory-efficient applications.
