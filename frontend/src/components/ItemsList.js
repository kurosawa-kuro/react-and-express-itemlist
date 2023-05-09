// src/components/ItemsList.js
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { fetchItems } from "../api";
import AddItemForm from "./AddItemForm";

const ItemsList = () => {
    const queryClient = useQueryClient();
    const { data: items, isLoading, isError, refetch } = useQuery(["items"], fetchItems);

    const handleNewItem = () => {
        refetch();
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching items</p>;
    }

    return (
        <div>
            <AddItemForm onNewItem={handleNewItem} />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
