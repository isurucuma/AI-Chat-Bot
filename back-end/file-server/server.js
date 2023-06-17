const path = require("path");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBak) => callBak(null, "./media"),
  filename: (req, file, callBack) => callBack(null, req.body.fileName),
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callBack) => {
    if (file.mimetype === "application/pdf") {
      callBack(null, true);
    } else {
      callBack(new Error("Only .pdf format allowed"));
    }
  },
});

const app = express();

app.use(express.json({ extended: true }));

// use this if you want to handle url encoded form data
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// teeling express to use the static file path as /media
app.use("/media", express.static(path.resolve(__dirname, "./media")));

app.post("/upload", upload.single("myFile"), (req, res) => {
  console.log(res);
  res.json({ message: "File uploaded successfully" });
});

app.listen(3001, "localhost", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is running at http://localhost:3001");
});
