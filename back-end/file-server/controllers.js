const fs = require("fs");
const path = require("path");

const deleteController = (req, res) => {
  const fileName = req.query.fileName;
  if (!fileName) {
    return res.status(400).send("Missing URL parameter: filename");
  }
  const filePath = path.join(__dirname, "media", fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found.");
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "persistant file delete operation failed" });
      }
      // File deleted successfully
      res.status(200).json({ fileName: fileName });
    });
  });
};

const getAllFileNamesController = (req, res) => {
  const mediaDir = path.join(__dirname, "media");

  // Read the contents of the media directory
  fs.readdir(mediaDir, (err, files) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("An error occurred while retrieving the files.");
    }

    // Retrieve metadata for each file
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(mediaDir, file);

        // Get the file stats to retrieve metadata
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err);
            reject(err);
          }

          // Extract the metadata
          const metadata = {
            fileName: file,
            size: Math.ceil(stats.size / 1024),
            uploadedAt: stats.birthtime,
            uploadedBy: "admin", // You can customize this value as needed
          };

          resolve(metadata);
        });
      });
    });

    // Wait for all promises to resolve
    Promise.all(filePromises)
      .then((metadataList) => {
        // Send the list of files with metadata as the response
        res.status(200).json(metadataList);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send("An error occurred while retrieving file metadata.");
      });
  });
};

const renameFileController = (req, res) => {
  const oldFileName = req.body.fileName;
  const newFileName = req.body.newFileName;

  // Check if the new filename is provided
  if (!newFileName) {
    return res.status(400).send("Missing new filename in request body.");
  }

  // Check if the new filename is the same as the old filename
  if (oldFileName === newFileName) {
    return res
      .status(400)
      .send("New filename should be different from the old filename.");
  }

  const oldFilePath = path.join(__dirname, "media", oldFileName);
  const newFilePath = path.join(__dirname, "media", newFileName);

  // Check if the file to rename exists
  fs.access(oldFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found.");
    }

    // Check if a file with the new filename already exists
    fs.access(newFilePath, fs.constants.F_OK, (err) => {
      if (!err) {
        return res
          .status(409)
          .send("A file with the same name already exists.");
      }

      // Rename the file
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("An error occurred while renaming the file.");
        }

        res.status(200).send(`File renamed successfully: ${newFileName}`);
      });
    });
  });
};

const downloadFileController = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "media", fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found.");
    }

    // Stream the file as the response
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("An error occurred while downloading the file.");
      }
    });
  });
};

const uploadFileController = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const uploadedFile = req.file;
  console.log("Uploaded file:", uploadedFile);

  // Return the uploaded file name to the user
  res.status(200).json({ uploadedFile: `${uploadedFile.filename}` });
};

module.exports = {
  deleteController,
  getAllFileNamesController,
  renameFileController,
  downloadFileController,
  uploadFileController,
};
