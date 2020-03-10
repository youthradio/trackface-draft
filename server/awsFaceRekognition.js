require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const bucket = "expfaceapp"; // the bucketname without s3://
const photo_source = "dogin.jpg";
const photo_target = "doge.png";
const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

class AWSFaceRecognition {
  constructor() {
    this.client = new AWS.Rekognition();
  }

  async compareFaces(inputImage, targetImage) {
    const params = {
      SourceImage: {
        Bytes: inputImage
      },
      TargetImage: {
        Bytes: targetImage
      }
    };
    return new Promise((resolve, reject) => {
      this.client.compareFaces(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}

module.exports = AWSFaceRecognition;
