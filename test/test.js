const request = require("supertest");
const baseURL = "http://localhost:8080/api";

describe("Services", () => {
  it("get items by search", async () => {
    let response = await request(baseURL).get("/items?q=ipad");
    response = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(response.success).toBe(true);
  });

  it("get item by id", async () => {
    let response = await request(baseURL).get("/items/MLA1131585881");
    response = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(response.success).toBe(true);
  });
});
