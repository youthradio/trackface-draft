'use strict';
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const binaryMimeTypes = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = (event, context) => {
  console.log('ENVIRONMENT VARIABLES\n' + JSON.stringify(process.env, null, 2));
  console.warn('Event not processed.');
  return awsServerlessExpress.proxy(server, event, context);
};
