const express = require("express");

const app = express();

app.use("/players", (_, res) => {
  res.status(200).json({});
});

module.exports = {
  app
};
