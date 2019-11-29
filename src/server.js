const express = require("express");

const byIdAsc = ({ id: idA }, { id: idB }) =>
  parseInt(idA, 10) - parseInt(idB, 10);

const byId = playerId => player =>
  parseInt(player.id, 10) === parseInt(playerId, 10);

const makeApp = ({ getDataAsync = () => Promise.resolve([]) } = {}) => {
  const app = express();

  app.get("/players", async (_, res) => {
    try {
      const data = await getDataAsync();
      res.status(200).json(data.sort(byIdAsc));
    } catch (_) {
      res.sendStatus(500);
    }
  });

  app.get("/players/:playerId", async (req, res) => {
    let data;
    try {
      data = await getDataAsync();
    } catch (_) {
      res.sendStatus(500);
      return;
    }
    const { playerId } = req.params;
    const player = data.find(byId(playerId));
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).send();
    }
  });

  return app;
};

module.exports = {
  makeApp
};
