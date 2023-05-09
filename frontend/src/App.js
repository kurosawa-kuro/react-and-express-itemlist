// src/App.js
import React from "react";
import "./App.css";
import ItemsList from "./components/ItemsList";
import AddItemForm from "./components/AddItemForm"; // Add this import

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Item List App</h1>
      </header>
      <ItemsList />
    </div>
  );
}

export default App;
