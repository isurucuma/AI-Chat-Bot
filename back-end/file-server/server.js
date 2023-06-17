const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const fileName = `${
      path.parse(file.originalname).name
    }-${uniqueId}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, callBack) => {
    if (file.mimetype === "application/pdf") {
      callBack(null, true);
    } else {
      callBack(new Error("Only .pdf format allowed"));
    }
  },
});

// Serve static files
app.use(express.static("public"));

// POST route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const uploadedFile = req.file;
  console.log("Uploaded file:", uploadedFile);

  // Return the uploaded file name to the user
  res.status(200).send(`Uploaded file name: ${uploadedFile.filename}`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
