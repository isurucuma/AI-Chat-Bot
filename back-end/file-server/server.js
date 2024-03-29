const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cors = require("cors");

const {
  deleteController,
  getAllFileNamesController,
  renameFileController,
  downloadFileController,
  uploadFileController,
} = require("./controllers");

const app = express();
app.use(cors());
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
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(express.json());

// POST route for file upload
app.post("/api/v1/upload", upload.single("file"), uploadFileController);

app.delete("/api/v1/files", deleteController);

app.get("/api/v1/files", getAllFileNamesController);

app.put("/api/v1/files/rename", renameFileController);

app.get("/api/v1/files/:filename", downloadFileController);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
