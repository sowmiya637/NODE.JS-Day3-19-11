let p1 = Promise.resolve("User Data Loaded");
let p2 = Promise.reject("Payment Failed");
let p3 = Promise.resolve("Orders Loaded");

Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
