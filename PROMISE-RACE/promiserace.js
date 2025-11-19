
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(" Timeout! Too slow."), ms);
  });
}

Promise.race([
  fetch("https://jsonplaceholder.typicode.com/todos/1"),
  timeout(5000)
])
  .then(res => res.json())  //res = API Response object, Convert to JSON
  .then(data => console.log("Winner:", data))  //print only if API wins
  .catch(err => console.log("Error:", err));
