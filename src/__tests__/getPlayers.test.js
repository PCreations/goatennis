const request = require("supertest");
const { app } = require("../server");

describe("GET /players", () => {
  it("should return a 200 http response with correct headers", async () => {
    const response = await request(app).get("/players");
    const contentTypeHeader = response.get("Content-Type");
    expect(contentTypeHeader).toContain("application/json");
  });
});
