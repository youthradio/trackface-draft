require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mime = require('mime');
const memStorage = multer.memoryStorage();
const AWSFaceRecognition = require('./awsFaceRekognition');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const cors = require('cors');

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function(req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${mime.getExtension(file.mimetype)}`);
//   }
// });

const corsOptions = {
  origin: ['https://youthradio.github.io', 'http://localhost:3000'],
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: false,
  allowedHeaders: 'Content-Type',
};
const upload = multer({
  storage: memStorage,
  limits: {
    fields: 2,
    fileSize: '15MB',
    files: 2,
  },
  fileFilter: function (req, file, callback) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = mime.getExtension(file.mimetype);

    if (filetypes.test(mimetype)) {
      return callback(null, true);
    }
    callback(
      new Error(
        'File upload only supports the following filetypes - ' + filetypes
      ),
      false
    );
  },
}).fields([
  { name: 'referenceimage', maxCount: 1 },
  { name: 'targetimage', maxCount: 1 },
]);

const app = express();
app.use(cors(corsOptions));
app.use(awsServerlessExpressMiddleware.eventContext());
const faceReg = new AWSFaceRecognition();

app.get('/', (req, res) => {
  console.log('ROOT access NOTHING HERE');
  res.send('Nothing here');
});

app.post('/push', async (req, res) =>
  new Promise((resolve, reject) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log('Error: Multer Upload', JSON.stringify(err, null, 2));
          return res.status(500).send({ error: err.stack });
        }
        if (!('referenceimage' in req.files) || !('targetimage' in req.files)) {
          const err = new Error('Error: Need two input files');
          res.status(500).send({ error: err.stack });
          return reject(err);
        }
        try {
          const results = await faceReg.compareFaces(
            req.files.referenceimage[0].buffer,
            req.files.targetimage[0].buffer
          );
          console.log('Sucess: Results');
          resolve(Object.assign(results, { error: 'success' }));
        } catch (err) {
          console.log('Error: faceReg process', JSON.stringify(err, null, 2));
          resolve(Object.assign({}, { error: err }));
        }
      });
    } catch (err) {
      console.log('Error: Upload catch', JSON.stringify(err, null, 2));
      return res.status(500).send({ error: err.stack });
      reject(err);
    }
  }).then((results) => {
    res.json(results);
  })
);

// const port = process.env.PORT;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
