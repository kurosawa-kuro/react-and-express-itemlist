// src/App.js
import React from "react";
import "./styles/App.css";
import ItemsList from "./components/ItemsList";

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
