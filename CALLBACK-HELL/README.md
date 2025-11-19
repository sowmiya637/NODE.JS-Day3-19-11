
# File Reading in Node.js – Concept Explanation

## Overview  
This project demonstrates three different ways to read files asynchronously in Node.js:  
1. **Callback-based approach**  
2. **Promise-based approach (with `.then` / `.catch`)**  
3. **`async` / `await` (built on Promises)**  

These approaches illustrate how Node.js handles I/O without blocking the event loop, improving performance and readability.

---

## Concepts

### Asynchronous Programming in Node.js  
- Node.js uses a **non-blocking, event-driven** model. :contentReference[oaicite:0]{index=0}  
- Asynchronous programming allows other code to run while I/O (like file reading) is being processed. :contentReference[oaicite:1]{index=1}  
- Instead of waiting for a task to finish (blocking), Node.js schedules it and continues executing other tasks.

---

## Callbacks  
- A **callback** is a function passed into another function, to be called when an asynchronous task completes. :contentReference[oaicite:2]{index=2}  
- In the callback approach:  
  ```js
  fs.readFile('file1.txt', 'utf-8', (err, data1) => {
    if (err) throw err;
    fs.readFile('file2.txt', 'utf-8', (err, data2) => {
      if (err) throw err;
      fs.readFile('file3.txt', 'utf-8', (err, data3) => {
        console.log(data1, data2, data3);
      });
    });
  });
````

* **Pros**: Simple and direct for a small number of asynchronous calls.
* **Cons**: When you nest callbacks like this, the code becomes harder to read and maintain; this problem is commonly called *callback hell*. ([CodeForGeek][1])

---

## Promises

* A **Promise** is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. ([Node.js][2])
* Promise states:

  * *Pending*: The operation hasn’t completed yet. ([GeeksforGeeks][3])
  * *Fulfilled (Resolved)*: The operation completed successfully. ([Node.js][2])
  * *Rejected*: The operation failed with an error. ([Node.js][2])
* Example with `.then` and `.catch` (as in your code):

  ```js
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
  ```
* **Pros**:

  * More readable and manageable than nested callbacks.
  * Better error handling (you can catch errors in one place). ([GeeksforGeeks][4])
* **Cons**:

  * `.then` chains can still become long and confusing for complex flows.

---

## Async / Await

* `async` / `await` is syntactic sugar over Promises. It allows you to write asynchronous code that *looks* synchronous. ([Wikipedia][5])
* Example (your first snippet):

  ```js
  const fs = require("fs").promises;

  async function readFiles() {
    try {
      const data1 = await fs.readFile('file1.txt', 'utf-8');
      const data2 = await fs.readFile('file2.txt', 'utf-8');
      const data3 = await fs.readFile('file3.txt', 'utf-8');

      console.log(data1, data2, data3);
    } catch (err) {
      console.log(err);
    }
  }

  readFiles();
  ```
* **Pros**:

  * Cleaner, more readable code.
  * Easier to reason about sequence of operations.
  * Error handling using `try` / `catch`, which feels like synchronous code.
* **Cons**:

  * You still need to work with Promises under the hood.
  * If not used carefully, many `awaits` in series can degrade performance (you could use `Promise.all` for parallelism).

---

## Why Use `fs.promises`

* Node.js provides a promise-based version of the `fs` module under `fs.promises`. ([Node.js][2])
* This makes it very convenient to use with async/await or `.then()` chaining.

---

| Approach      | Readability    | Error Handling     | Best For                    |
| ------------- | -------------- | ------------------ | --------------------------- |
| Callbacks     | Lower (nested) | Manual (nested)    | Very simple async tasks     |
| Promises      | Medium         | `.catch()` handles | Sequential or chained tasks |
| Async / Await | High (clean)   | `try` / `catch`    | Complex flows, more logic   |

---

## Conclusion

* **Callbacks** are fundamental, but can get messy.
* **Promises** offer a better structure and are more powerful.
* **Async/await** yields the most readable code and is preferred for modern JavaScript / Node.js.
* For I/O tasks like file reading, using `fs.promises` with `async/await` gives clean, maintainable code.


