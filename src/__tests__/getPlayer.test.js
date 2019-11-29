const request = require("supertest");
const { makeApp } = require("../server");
const playersFixture = require("./fixture.json");

describe("GET /players/<id>", () => {
  it("given some players should return a 404 error if no player found", async () => {
    const app = makeApp({
      getDataAsync: Promise.resolve(playersFixture.players)
    });
    const response = await request(app).get("/players/0");
    expect(response.statusCode).toEqual(404);
  });
});
