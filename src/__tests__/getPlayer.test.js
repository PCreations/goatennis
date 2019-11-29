const request = require("supertest");
const { create: createServer } = require("../server");
const playersFixture = require("./fixture.json");

describe("GET /players/<id>", () => {
  it("given some players should return a 404 error if no player found", async () => {
    const server = createServer({
      getDataAsync: () => Promise.resolve(playersFixture.players)
    });
    const response = await request(server).get("/players/0");
    expect(response.statusCode).toEqual(404);
  });
  it("given some players should return a 200 code with the correct player if player exists", async () => {
    const { players } = playersFixture;
    const server = createServer({
      getDataAsync: () => Promise.resolve(players)
    });
    const response = await request(server).get(`/players/${players[0].id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(players[0]);
  });
  it("should return a 500 if there is an error while retrieving data", async () => {
    const server = createServer({ getDataAsync: () => Promise.reject() });
    const response = await request(server).get("/players/42");
    expect(response.status).toBe(500);
  });
});
