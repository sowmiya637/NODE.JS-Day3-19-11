function step1() {
  return Promise.resolve("Step 1 success");
}

function step2() {
  return Promise.reject(" Step 2 failed");
}

function step3() {
  return Promise.resolve("Step 3 success");
}

async function runSteps() {
  try {
    const res1 = await step1();
    console.log(res1);

    const res2 = await step2();  // error here
    console.log(res2);

    const res3 = await step3();
    console.log(res3);

  } catch (err) {
    console.log("Error Caught:", err);
  }
}

runSteps();
