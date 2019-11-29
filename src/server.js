const express = require("express");

const byIdAsc = ({ id: idA }, { id: idB }) =>
  parseInt(idA, 10) - parseInt(idB, 10);

const byId = playerId => player =>
  parseInt(player.id, 10) === parseInt(playerId, 10);

const makeApp = ({ getDataAsync = () => Promise.resolve([]) } = {}) => {
  const app = express();

  app.get("/players", async (_, res) => {
    const data = await getDataAsync();
    data.sort(byIdAsc);
    res.status(200).json(data);
  });

  app.get("/players/:playerId", async (req, res) => {
    const data = await getDataAsync();
    const { playerId } = req.params;
    const player = data.find(byId(playerId));
    if (player) {
      res.status(200).json(player);
    }
    res.status(404).send();
  });

  return app;
};

module.exports = {
  makeApp
};
