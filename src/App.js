import { Router } from "@reach/router";
import React, { createContext, useState } from "react";
import "./App.css";
import History from "./pages/History";
import Home from "./pages/Home";

export const userContext = createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [userPoints, setUserPoints] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [category, setCategory] = useState({ category: "" });

  return (
    <userContext.Provider
      value={{
        userName,
        setUserName,
        userPoints,
        setUserPoints,
        productsList,
        setProductsList,
        category,
        setCategory,
      }}
    >
      <Router>
        <History exact path="/aerolab-challenge-history" />
        <Home exact path="/aerolab-challenge" />
      </Router>
    </userContext.Provider>
  );
}

export default App;
