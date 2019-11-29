const functions = require("firebase-functions");
const { create: createServer } = require("./lib/server/create");

const server = createServer();

const api = functions.https.onRequest(server);

module.exports = {
  api
};
