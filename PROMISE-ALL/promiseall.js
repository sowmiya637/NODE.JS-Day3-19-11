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
