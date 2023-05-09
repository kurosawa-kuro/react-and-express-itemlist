// src/api.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const fetchItems = async () => {
    try {
        const response = await apiClient.get("/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};
