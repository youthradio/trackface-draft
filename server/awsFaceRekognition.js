require("dotenv").config();
const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

class AWSFaceRecognition {
  constructor() {
    this.client = new AWS.Rekognition({apiVersion: '2016-06-27'});
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
