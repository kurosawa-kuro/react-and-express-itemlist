// src/components/ItemsList.js
import React, { useEffect, useState } from "react";
import { fetchItems } from "../api";

const ItemsList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
