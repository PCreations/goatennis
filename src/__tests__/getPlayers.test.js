const request = require("supertest");
const { create: createServer } = require("../server");
const playersFixture = require("./fixture.json");

describe("GET /players", () => {
  it("should return a 200 http response with correct header", async () => {
    const server = createServer({ getDataAsync: () => Promise.resolve([]) });
    const response = await request(server).get("/players");
    const contentTypeHeader = response.get("Content-Type");
    expect(contentTypeHeader).toContain("application/json");
  });
  it("should return a 500 if there is an error while retrieving data", async () => {
    const server = createServer({ getDataAsync: () => Promise.reject() });
    const response = await request(server).get("/players");
    expect(response.status).toBe(500);
  });
  test("given a list of data it should return the list of data ordered by id", async () => {
    const data = [
      {
        id: 3,
        foo: "bar"
      },
      {
        id: 1,
        foo: "baz"
      },
      {
        id: 2,
        foo: "foobaz"
      }
    ];
    const server = createServer({ getDataAsync: () => Promise.resolve(data) });
    const response = await request(server).get("/players");
    expect(response.body).toEqual([
      {
        id: 1,
        foo: "baz"
      },
      {
        id: 2,
        foo: "foobaz"
      },
      {
        id: 3,
        foo: "bar"
      }
    ]);
  });
  test("given a static json file as data it should return the correct response", async () => {
    const server = createServer({
      getDataAsync: () => Promise.resolve(playersFixture.players)
    });
    const response = await request(server).get("/players");
    expect(response.body).toMatchSnapshot(
      "players should be returned by ascending order"
    );
  });
  test("given the default implementation it should return correct data", async () => {
    const server = createServer();
    const response = await request(server).get("/players");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchSnapshot(
      "players should be returned by ascending order"
    );
  });
});
