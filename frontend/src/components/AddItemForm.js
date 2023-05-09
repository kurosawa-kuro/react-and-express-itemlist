// src/components/AddItemForm.js
import React, { useState } from "react";
import { createItem } from "../api";

const AddItemForm = ({ onNewItem }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setError("Name is required");
            return;
        }

        try {
            const newItem = await createItem(name);
            setName("");
            setError(null);
            onNewItem(newItem);
        } catch (error) {
            setError("Error creating item");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Item name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <button type="submit">Add</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default AddItemForm;
