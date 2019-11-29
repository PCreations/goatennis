require("dotenv").config();
const { getConfig } = require("../../config");
const { create: createServer } = require("./create");

const config = getConfig();
const server = createServer();

server.listen(config.PORT, () =>
  console.log(`Server listening on port ${config.PORT}`)
);
