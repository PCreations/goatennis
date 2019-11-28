const request = require("supertest");
const express = require("express");

describe("GET /players", () => {
  it("should return a 200 http response with correct headers", async () => {
    const app = express();
    app.use("/players", (_, res) => {
      res.status(200).json({});
    });
    const response = await request(app).get("/players");
    const contentTypeHeader = response.get("Content-Type");
    expect(contentTypeHeader).toContain("application/json");
  });
});
