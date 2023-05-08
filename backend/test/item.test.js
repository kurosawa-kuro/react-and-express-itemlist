// path: backend/test/index.test.js

import request from "supertest";
import app from "../src/app/index.js";

// Mocking the prismaClient's findMany method
jest.mock("../src/database/prisma/prismaClient.js", () => ({
    db: {
        item: {
            findMany: jest.fn(() => [
                { id: 1, name: "Item1" },
                { id: 2, name: "Item2" },
            ]),
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
