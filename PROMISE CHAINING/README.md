
# Promise Chaining in JavaScript / Node.js

## Overview  
This project demonstrates how to use **Promise chaining** in JavaScript (especially Node.js) for handling multiple asynchronous operations sequentially. Instead of deeply nested callbacks, Promise chaining allows a clean, readable way to handle asynchronous control flow and centralized error handling.

---

## What Is Promise Chaining?  
- Promise chaining is a pattern where you chain multiple `.then()` calls to perform asynchronous tasks one after another. :contentReference[oaicite:0]{index=0}  
- Each `.then()` returns a **new Promise**, so the next `then` in the chain waits for the previous one. :contentReference[oaicite:1]{index=1}  
- If any promise in the chain rejects (errors), a single `.catch()` at the end handles it. :contentReference[oaicite:2]{index=2}  

---

## Why Use Promise Chaining?  
1. **Readable Sequence**: Allows writing a sequence of dependent asynchronous operations in a way that’s easy to follow. :contentReference[oaicite:3]{index=3}  
2. **Avoid Callback Hell**: Eliminates deeply nested callbacks, making code flatter and more maintainable. :contentReference[oaicite:4]{index=4}  
3. **Centralized Error Handling**: One `.catch()` can handle errors from any step in the chain. :contentReference[oaicite:5]{index=5}  
4. **Composability**: You can return a value or another promise in a `.then()`, enabling flexible chaining. :contentReference[oaicite:6]{index=6}  

---

## How It Works — Concept Flow

Using your example:

```js
const fs = require("fs").promises;

fs.readFile("file1.txt", "utf‑8")
  .then(data1 => {
    console.log("File 1:", data1);
    return fs.readFile("file2.txt", "utf‑8");
  })
  .then(data2 => {
    console.log("File 2:", data2);
    return fs.readFile("file3.txt", "utf‑8");
  })
  .then(data3 => {
    console.log("File 3:", data3);
  })
  .catch(err => {
    console.error("Error:", err);
  });
````

1. `fs.readFile("file1.txt", "utf‑8")` returns a promise.
2. On success, the first `.then` gets `data1`, logs it, then **returns** `fs.readFile("file2.txt", "utf‑8")`, which is itself a Promise.
3. The second `.then` waits for that Promise, gets `data2`, logs it, returns a third promise (`fs.readFile("file3.txt", "utf‑8")`).
4. The third `.then` waits for that, logs `data3`.
5. If **any** of these Promises reject (for example, a file is missing or cannot be read), control jumps to the `.catch()` at the end, which logs the error. ([GeeksforGeeks][1])

---

## Error Propagation in Promise Chains

* If a `.then()` callback **throws** an error (or returns a rejected promise), the `catch()` will catch it. ([MDN Web Docs][2])
* You don’t need individual error handlers in every `.then()`; a single `.catch()` is sufficient for the whole chain. ([GeeksforGeeks][3])
* You can also **recover** from errors: a `catch()` can return a value or another promise so that the chain continues. ([peerdh.com][4])

---

## Important Details & Best Practices

* **Always return** from `.then()` if you want the next step to wait: returning a promise ensures correct sequencing. ([peerdh.com][4])
* Avoid **nesting** promises inside `.then()` unnecessarily; prefer chaining. ([JavaScript.info][5])
* Use `.finally()` if you need to run some code regardless of success or failure. ([C# Corner][6])
* Be careful about **unhandled rejections**: always include `.catch()` somewhere in your chain. ([PHP 中文网][7])

---

## Example Use Cases

* Reading multiple files sequentially (as in this example).
* Making HTTP API calls in sequence (e.g., fetch user → fetch user’s orders → process orders). ([GeeksforGeeks][3])
* Performing a series of asynchronous transformations: each depends on the result of the previous.

---

## Summary Table

| Feature             | Explanation                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| **Sequential Flow** | Each `.then()` waits for the previous promise to resolve                 |
| **Error Handling**  | Single `.catch()` handles errors from any point in the chain             |
| **Return Values**   | Return a value or a promise from `.then()` to pass data or chain further |
| **Readability**     | Cleaner and more maintainable than nested callbacks                      |

---

## When Not to Use Promise Chaining

* When you don’t need sequential operations — e.g. independent tasks that can run in parallel (`Promise.all` might be better).
* Very simple one-off asynchronous tasks where a promise without chaining is enough.
* For very complex logic involving loops or conditionals, `async/await` might lead to more readable code.

---

## Further Reading / References

* GeeksforGeeks: Node.js Promise Chaining ([GeeksforGeeks][8])
* JavaScript.info: Promise Chaining in JavaScript ([JavaScript.info][5])
* MDN: Using Promises and Error Handling ([MDN Web Docs][2])

---

## Conclusion

Promise chaining is a powerful and clean way to handle a sequence of asynchronous operations in JavaScript. It avoids deeply nested callbacks, centralizes error handling, and allows for flexible, composable logic. In your example with `fs.readFile`, chaining lets you read multiple files in order, and handle any I/O error gracefully with a `.catch()`.


