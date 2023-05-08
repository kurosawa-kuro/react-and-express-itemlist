// Path: backend/test/item.test.js

import request from "supertest";
import app from "../src/app/index.js";

// Mocking the prismaClient's create method
jest.mock("../src/database/prisma/prismaClient.js", () => ({
    db: {
        item: {
            findMany: jest.fn(() => [
                { id: 1, name: "Item1" },
                { id: 2, name: "Item2" },
            ]),
            create: jest.fn((data) => ({
                id: 3,
                name: data.data.name,
            })),
        },
    },
}));

describe("GET /items", () => {
    it("should return all items", async () => {
        const response = await request(app).get("/items");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: "Item1" },
            { id: 2, name: "Item2" },
        ]);
    });
});

describe("POST /items", () => {
    it("should create a new item", async () => {
        const newItem = {
            name: "New Item",
        };

        const response = await request(app)
            .post("/items")
            .send(newItem)
            .set("Accept", "application/json");

        console.log("response.body:", response.body)

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 3,
            name: "New Item",
        });
    });
});
