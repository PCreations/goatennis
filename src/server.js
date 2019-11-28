const express = require("express");

const byIdAsc = ({ id: idA }, { id: idB }) =>
  parseInt(idA, 10) - parseInt(idB, 10);

const makeApp = ({ getDataAsync = () => Promise.resolve([]) } = {}) => {
  const app = express();

  app.use("/players", async (_, res) => {
    const data = await getDataAsync();
    data.sort(byIdAsc);
    res.status(200).json(data);
  });

  return app;
};

module.exports = {
  makeApp
};
