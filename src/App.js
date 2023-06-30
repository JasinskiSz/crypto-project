import React, {useState} from "react";
import CryptoList from "./components/CryptoList";
import "./App.css";
import Navbar from "./components/Navbar";

/**
 * main app component
 * @return {JSX.Element}
 */
function App() {
    const title = "Crypto Trader";
    const logo = "images/logo.jpg";
    const [balance, setBalance] = useState(100000);

    return (
        <div className="text-center">
            <Navbar logo={logo} appName={title} balance={balance} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center"
                }}
            >
            </div>
            <CryptoList balance={balance} setBalance={setBalance} />
        </div>
    );
}

export default App;
