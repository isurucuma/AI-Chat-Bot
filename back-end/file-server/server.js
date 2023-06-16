const path = require("path");
const express = require("express");

const app = express();

// teeling express to use the static file path as /media
app.use("/media", express.static(path.resolve(__dirname, "./media")));

app.listen(3001, "localhost", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is running at http://localhost:3001");
});
