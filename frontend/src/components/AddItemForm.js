// src/components/AddItemForm.js
import React, { useState } from "react";
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { createItem } from "../api";

const AddItemForm = ({ onNewItem }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (data) => createItem(data.name),
        {
            onSuccess: () => {
                setName("");
                onNewItem();
                queryClient.invalidateQueries("items");
            },
            onError: () => {
                setError("Error creating item");
            },
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setError("Name is required");
            return;
        }

        mutation.mutate({ name });
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

