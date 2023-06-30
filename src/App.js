import React from "react";
import CryptoList from "./components/CryptoList";
import "./App.css";

/**
 * main app component
 * @return {JSX.Element}
 */
function App() {
    return (
        <div className="container text-center">
            <h1 className="mt-4">My Crypto App</h1>
            <CryptoList />
        </div>
    );
}

export default App;
