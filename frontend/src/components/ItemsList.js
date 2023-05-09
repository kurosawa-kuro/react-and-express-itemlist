// src/components/ItemsList.js
import React, { useEffect, useState } from "react";
import { fetchItems } from "../api";
import AddItemForm from "./AddItemForm"; // Add this import

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

    const handleNewItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div>
            <AddItemForm onNewItem={handleNewItem} /> {/* Pass the handleNewItem function to the AddItemForm component */}
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
