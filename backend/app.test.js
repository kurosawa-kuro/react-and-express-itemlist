// app.test.js

import request from "supertest";
import app from "./app.js";

describe("GET /", () => {
    it("should return JSON data with status code 200", async () => {
        const res = await request(app).get("/");
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([
            { id: 1, name: "name 1" },
            { id: 2, name: "name 2" },
            { id: 3, name: "name 3" },
        ]);
    });
});
