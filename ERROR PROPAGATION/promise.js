
function step1() {
  return Promise.resolve("Step 1 success");
}

function step2() {
  return Promise.reject(" Step 2 failed");
}

function step3() {
  return Promise.resolve("Step 3 success");
}

step1()
  .then(res => {
    console.log(res);
    return step2();
  })
  .then(res => {
    console.log(res);
    return step3();
  })
  .catch(err => {
    console.log("Error Caught:", err); // error propagation
  });
