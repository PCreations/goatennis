const express = require("express");
const fetch = require("node-fetch");

const DATA_URL =
  "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json";

const defaultGetDataAsync = () =>
  fetch(DATA_URL)
    .then(res => res.json())
    .then(data => data.players);

const byIdAsc = ({ id: idA }, { id: idB }) =>
  parseInt(idA, 10) - parseInt(idB, 10);

const byId = playerId => player =>
  parseInt(player.id, 10) === parseInt(playerId, 10);

const create = ({ getDataAsync = defaultGetDataAsync } = {}) => {
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
  create
};
