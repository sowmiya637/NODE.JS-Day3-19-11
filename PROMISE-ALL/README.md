
# Understanding `Promise.all()` in JavaScript / Node.js

## Overview  
This project demonstrates how to use **`Promise.all()`** to read multiple files in parallel using Node.js. Instead of waiting for one file to be read and then starting the next, `Promise.all()` helps you run all the read operations concurrently and process them when *all* are done (or fail early if any fails).

Your example:

```js
const fs = require("fs").promises;

Promise.all([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("settings.json", "utf-8"),
  fs.readFile("logs.txt", "utf-8")
])
.then(([user, settings, logs]) => {
  console.log("User:", user);
  console.log("Settings:", settings);
  console.log("Logs:", logs);
})
.catch(err => {
  console.log("Error:", err);
});
````

---

## What Is `Promise.all()`?

* `Promise.all()` is a **static method** on the `Promise` class. ([MDN Web Docs][1])
* It takes an **iterable** (usually an array) of promises (or “thenables”) as input. ([MDN Web Docs][2])
* It returns a **single Promise** that:

  1. *Resolves* when **all** input promises resolve. Its resolution value is an array containing the results, in the same order as the input. ([devdoc.net][3])
  2. *Rejects* as soon as **any** of the input promises rejects, with the reason (error) of the first rejected promise. ([MDN Web Docs][2])

---

## Why Use `Promise.all()`?

Here are some of its benefits:

1. **Parallel Execution**

   * Since all the passed promises are started (or awaited) together, you don’t wait for one to finish before starting the next. ([attacomsian.com][4])
   * This results in better performance when you have independent async tasks (like reading multiple files). ([Ceos3c][5])
2. **Aggregated Results**

   * When all succeed, you get an array of values. You can destructure it to get individual results:

     ```js
     .then(([user, settings, logs]) => { … })
     ```

     ([MDN Web Docs][1])
3. **Fail-fast Behavior**

   * If any promise rejects, `Promise.all()` rejects immediately — it doesn’t wait for other promises to finish. ([GeeksforGeeks][6])
   * This is useful when the subsequent logic depends on *all* operations to succeed, and you’d rather stop early if any fails. ([attacomsian.com][4])
4. **Error Handling**

   * Because of its fail-fast nature, you can handle all errors from any promise using a **single `.catch(...)`** block. ([MDN Web Docs][1])
   * If you want to wait for *all* promises to settle (even if some fail), you might consider using `Promise.allSettled()` instead. ([MDN Web Docs][1])

---

## Important Details & Behavior

* **Order of results**: The values in the result array maintain the **same order** as the input promises, regardless of which promise resolves first. ([Codecademy][7])
* **Non-promise values**: If the iterable contains non-promise values, they are treated as resolved promises with those values. ([MDN Web Docs][1])
* **Empty iterable**: If you pass an empty iterable (e.g., `[]`), `Promise.all([])` returns a promise that is already resolved (with an empty array). ([devdoc.net][3])
* **Asynchronous resolution**: Even if all input promises are already resolved, `Promise.all` resolves asynchronously (after the current call stack). ([devdoc.net][3])

---

## Example in Context (Your File‑Reading Scenario)

1. You create an array of three file‑read promises:

   * `fs.readFile("user.json", "utf-8")`
   * `fs.readFile("settings.json", "utf-8")`
   * `fs.readFile("logs.txt", "utf-8")`
2. `Promise.all([...])` waits until **all three files** are successfully read.
3. Once all are done, `.then(([user, settings, logs]) => { ... })` runs, giving you the contents of all three.
4. If any of the file reads fails (e.g., file not found), `.catch(err => { ... })` will catch that error immediately, and you can handle it (e.g., log the error, retry, abort).

---

## Advantages & Trade-offs

| Pros                                                                 | Cons / Trade‑offs                                                                                                      |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Runs multiple async tasks concurrently → faster overall              | If one fails, you lose the rest (unless handled) because of fail-fast behavior                                         |
| Clean code: one `.then()` for all results, one `.catch()` for errors | Not suitable if you need to wait for *all* promises (successful or not) — consider `Promise.allSettled()` in that case |
| Maintains result order                                               | If you have very many promises, memory usage could be high (since all results are stored in an array)                  |

---

## Best Practices

* Use `Promise.all()` for **independent** asynchronous tasks that don’t rely on each other.
* Always include a `.catch()` to handle possible rejection.
* If you want **all tasks to complete** (even on failure) and then inspect which failed/succeeded, use `Promise.allSettled()`.
* Avoid passing extremely long arrays of promises if memory is a concern.
* Be careful about side-effects: since all tasks run in parallel, they may affect shared state if not handled correctly.

---

* `Promise.all()` is a powerful method for running multiple asynchronous operations in parallel.
* It simplifies handling multiple promises by returning a single promise that gives you all results in one go.
* Its fail-fast behavior makes it good when you want to stop on the first error; but if you need to wait for every promise no matter what, other methods might be more suitable.

