function step1(cb) {
  cb(null, "Step 1 success");  //null - means no error
}

function step2(cb) {
  cb(" Step 2 failed");
}

function step3(cb) {
  cb(null, "Step 3 success");
}

step1((err, res1) => {
  if (err) return console.log("Error:", err);

  console.log(res1);

  step2((err, res2) => {
    if (err) return console.log("Error:", err); // error handled here

    console.log(res2);

    step3((err, res3) => {
      if (err) return console.log("Error:", err);

      console.log(res3);
    });
  });
});
