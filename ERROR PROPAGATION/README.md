
# Asynchronous Flow in JavaScript — Concept Explanation

## Overview  
This project demonstrates three different ways to handle asynchronous operations in JavaScript / Node.js:  
1. **Callbacks**  
2. **Promises**  
3. **`async / await`**  

Using the example functions `step1`, `step2`, and `step3`, we simulate sequential steps that can succeed or fail, to illustrate how each approach handles control flow and error propagation.

---

## Concepts

### Callbacks  
- **Definition**: A callback is a function passed as an argument to another function, which is then invoked when an asynchronous operation completes. :contentReference[oaicite:0]{index=0}  
- **Flow**: In the callback version:

  ```js
  step1((err, res1) => {
    if (err) return console.log("Error:", err);
    console.log(res1);

    step2((err, res2) => {
      if (err) return console.log("Error:", err);
      console.log(res2);

      step3((err, res3) => {
        if (err) return console.log("Error:", err);
        console.log(res3);
      });
    });
  });
````

* **Error Handling**: You manually check `err` in each callback.
* **Problems**: This can lead to *callback hell* or *pyramid of doom* when chaining many asynchronous operations, making code hard to read and maintain. ([GeeksforGeeks][1])
* **Use Case**: Simple or legacy asynchronous APIs, or when you want a very lightweight abstraction.

---

### Promises

* **Definition**: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, and its resulting value. ([GeeksforGeeks][1])

* **States of a Promise**:

  * Pending — the asynchronous work is not finished yet. ([CodeForGeek][2])
  * Fulfilled (resolved) — the operation succeeded. ([CodeForGeek][2])
  * Rejected — the operation failed. ([CodeForGeek][2])

* **Flow Example** (your code):

  ```js
  step1()
    .then(res1 => {
      console.log(res1);
      return step2();
    })
    .then(res2 => {
      console.log(res2);
      return step3();
    })
    .catch(err => {
      console.log("Error Caught:", err);
    });
  ```

* **Error Handling**: Use `.catch()` to catch any rejection in the chain. ([CodeForGeek][2])

* **Pros**:

  * More readable than nested callbacks. ([GeeksforGeeks][1])
  * Better error propagation because you can handle all rejections centrally.

* **Cons**:

  * Long chains of `.then()` can still become hard to reason about. ([CodeForGeek][2])

* **Use Case**: When dealing with multiple asynchronous operations and you want to chain them in a manageable way.

---

### Async / Await

* **Definition**: `async / await` is syntactic sugar built on top of Promises that allows you to write asynchronous code in a more synchronous style. ([GeeksforGeeks][1])
* **How It Works**:

  * `async` before a function means that the function always returns a Promise. ([Plain English][3])
  * `await` pauses the execution of the async function until the Promise is settled (either resolved or rejected). ([Wikipedia][4])
* **Flow Example** (your code):

  ```js
  async function runSteps() {
    try {
      const res1 = await step1();
      console.log(res1);

      const res2 = await step2();
      console.log(res2);

      const res3 = await step3();
      console.log(res3);

    } catch (err) {
      console.log("Error Caught:", err);
    }
  }

  runSteps();
  ```
* **Error Handling**: Use standard `try ... catch` blocks, which makes the code look like synchronous exception handling. ([CodeForGeek][2])
* **Pros**:

  * Very readable — asynchronous steps look like normal code. ([Compile7][5])
  * Easier to maintain, especially for sequential flows.
* **Cons**:

  * Under the hood, it's still Promises, so you need to understand them.
  * If you `await` one by one, operations happen in series. For parallelism you might need `Promise.all`.
* **Use Case**: For most modern code, especially when readability and maintainability matter.

---

## Comparison Table

| Approach          | Readability                                              | Error Handling                                 | Use Case / When to Use                 |
| ----------------- | -------------------------------------------------------- | ---------------------------------------------- | -------------------------------------- |
| **Callbacks**     | Can become nested (“callback hell”) ([GeeksforGeeks][1]) | Manual error-first checks in each callback     | Legacy APIs, very simple async tasks   |
| **Promises**      | `.then()` chaining is more structured ([CodeForGeek][2]) | `.catch()` handles errors across the chain     | Chaining multiple async operations     |
| **Async / Await** | Most readable, looks synchronous ([Compile7][5])         | `try … catch` blocks make error handling clean | Complex async flows, maintainable code |

---

## Why Use Promises / Async-Await Over Callbacks?

* Callbacks are powerful, but when you have multiple async steps, managing nested callback functions quickly becomes hard. ([AST Consulting][6])
* Promises abstract that complexity and encourage flatter, more composable code. ([CodeForGeek][2])
* Async/Await makes this even more natural by letting you write `await`-based code, which is easier to read and reason about. ([GeeksforGeeks][7])
* Error propagation is cleaner with Promises or Async/Await — you don’t need to check errors manually in each callback. ([GeeksforGeeks][1])

---

## In Your Example Context (step1, step2, step3)

* **Callbacks**:

  * Each step takes a callback; if one fails, the next steps are not called.
  * Error handling is local to each call.

* **Promises**:

  * `step1().then(...).then(...).catch(...)` — if any step rejects, the `.catch()` runs.

* **Async/Await**:

  * `await` for each step inside a `try`, so if any step throws (reject), you catch it in one place.

---

## Best Practices

* Prefer **async/await** for new code because it's clean and easy to maintain.
* Understand **Promises** well — since async/await is built on top of them, knowing `.then()` and `.catch()` is useful.
* Use **callbacks** only when working with older APIs or very simple async operations — or when performance requires avoiding Promise overhead (rare).

---


* **Callbacks**, **Promises**, and **Async/Await** are all mechanisms to handle asynchronous code in JavaScript.
* Each has advantages and tradeoffs: callbacks are low-level, promises offer structure, and async/await gives readability.
* For modern development, **async/await** is often the best choice for readability and maintainability.

