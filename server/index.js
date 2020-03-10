require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mime = require("mime");
const memStorage = multer.memoryStorage();
const AWSFaceRecognition = require("./awsFaceRekognition");

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function(req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${mime.getExtension(file.mimetype)}`);
//   }
// });

const upload = multer({
  storage: memStorage,
  limits: {
    fields: 2,
    fileSize: "5MB",
    files: 2,
    parts: 4
  },
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = mime.getExtension(file.mimetype);

    if (filetypes.test(mimetype)) {
      return cb(null, true);
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + filetypes
      ),
      false
    );
  }
}).fields([
  { name: "referenceimage", maxCount: 1 },
  { name: "targetimage", maxCount: 1 }
]);

const app = express();
const faceReg = new AWSFaceRecognition();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/push", (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(500).send({ error: err.stack });
    }
    if (!("referenceimage" in req.files) || !("targetimage" in req.files)) {
      const err = new Error("Error: Need two input files");
      res.status(500).send({ error: err.stack });
      return next(err);
    }
    const results = await faceReg.compareFaces(
      req.files.referenceimage[0].buffer,
      req.files.targetimage[0].buffer
    );
    return res.json(results);
  });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
