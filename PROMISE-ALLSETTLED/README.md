
# Understanding `Promise.allSettled()` in JavaScript / Node.js

## Overview  
This example demonstrates how to use `Promise.allSettled()` to run multiple independent promises and get the outcome of **all** of them — whether they succeed or fail.

```js
let p1 = Promise.resolve("User Data Loaded");
let p2 = Promise.reject("Payment Failed");
let p3 = Promise.resolve("Orders Loaded");

Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
````

Here, `p1` and `p3` resolve, while `p2` rejects. Using `Promise.allSettled()`, you can inspect the result of each promise without stopping on the first failure.

---

## What Is `Promise.allSettled()`?

* `Promise.allSettled()` is a **static method** on the `Promise` class. ([MDN Web Docs][1])
* It takes an iterable (usually an array) of promises. ([MDN Web Docs][1])
* It returns a single `Promise` that **resolves** when **all** the input promises have settled (i.e., either fulfilled or rejected). ([MDN Web Docs][1])
* The resolved value is an **array of objects**, each object representing the outcome of one promise. ([MDN Web Docs][2])
* Each result object has:

  * `status`: either `"fulfilled"` or `"rejected"` ([MDN Web Docs][1])
  * `value`: present only when the promise was fulfilled ([MDN Web Docs][1])
  * `reason`: present only when the promise was rejected ([MDN Web Docs][1])

---

## Why Use `Promise.allSettled()`?

### **When It's Useful**

* When you need to run multiple **independent** asynchronous tasks, and **each result matters** — success or failure. ([MDN Web Docs][1])
* When you **do not want to “fail fast”** (i.e., stop on the first rejection), but rather wait for *all* tasks to complete. ([HowDev][3])
* Good for tasks like:

  * Logging / analytics (even if one endpoint fails)
  * Making multiple API calls where partial data is acceptable
  * Parallel non-critical operations

### **Behavior Compared to `Promise.all()`**

* **`Promise.all()`** rejects immediately if any promise rejects — “fail fast”. ([GeeksforGeeks][4])
* **`Promise.allSettled()`** never rejects due to input promise failures. It always resolves (unless there's a programming error). ([PHP.cn][5])
* This means you're guaranteed to get the outcome of **every** promise. ([GeeksforGeeks][4])

---

## Example Result Structure

Given your example:

```js
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
```

The `results` array might look like:

```js
[
  { status: "fulfilled", value: "User Data Loaded" },
  { status: "rejected", reason: "Payment Failed" },
  { status: "fulfilled", value: "Orders Loaded" }
]
```

* First item: `p1` succeeded (`fulfilled`) → has `value`.
* Second item: `p2` failed (`rejected`) → has `reason`.
* Third item: `p3` succeeded → has `value`.

---

## Advantages & Trade-offs

| Pros                                                                     | Cons                                                                                 |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| You get the result of **all** promises, not just until the first failure | Since it waits for *all* promises, slower tasks could delay overall resolution       |
| Useful for non-critical or parallel tasks                                | You still need to write code to **inspect** each result (`status`) explicitly        |
| Graceful handling: errors do not short-circuit the flow                  | Not suited when tasks depend on each other (for that, `Promise.all()` may be better) |

---

## Best Practices

* Always check the `status` of each result (fulfilled / rejected) before using `value` or `reason`.
* Use `Promise.allSettled()` when you need **complete insight** into a group of asynchronous operations.
* For tasks where failure of one should stop the operation, consider `Promise.all()` instead.
* If you want to wait for everything, but don’t care about failures, handle rejections in each promise or ignore them — but `allSettled()` is cleaner.

---

`Promise.allSettled()` is a powerful tool when you want to run multiple promises in parallel and care about the outcome of *each one*, regardless of whether they succeed or fail. Unlike `Promise.all()`, it does **not** short-circuit on error — it waits for all and gives you a full report.


