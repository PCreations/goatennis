const request = require("supertest");
const { makeApp } = require("../server");

describe("GET /players", () => {
  it("should return a 200 http response with correct header", async () => {
    const app = makeApp();
    const response = await request(app).get("/players");
    const contentTypeHeader = response.get("Content-Type");
    expect(contentTypeHeader).toContain("application/json");
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
    const app = makeApp({ getDataAsync: () => Promise.resolve(data) });
    const response = await request(app).get("/players");
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
});
