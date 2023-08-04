import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { ListGroup, Modal } from "react-bootstrap";
import { getTopTenCryptoData } from "../services/CoinGeckoRestService";
import CryptoDetail from "./CryptoDetail";
import CryptoItem from "./CryptoItem";
import { simulatePrice } from "../services/PriceSimulationService";

/**
 * component representing a list of cryptocurrencies.
 * @return {JSX.Element} The rendered CryptoList component.
 */
function CryptoList({ balance, setBalance }) {
    const [cryptoData, setCryptoData] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ownedCoins, setOwnedCoins] = useState({});
    const [cryptoPrices, setCryptoPrices] = useState({});

    useEffect(() => {
        const fetchCryptoData = async () => {
            setCryptoData(await getTopTenCryptoData());
            updateCryptoData();
        };

        fetchCryptoData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateCryptoData();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const updateCryptoData = () => {
        setCryptoData((prevCryptoData) => {
            console.log("updating crypto data " + prevCryptoData);
            const updatedData = prevCryptoData.map((coin) => {
                const updatedPrice = simulatePrice(coin.current_price);

                return {
                    ...coin,
                    current_price: updatedPrice
                };
            });

            const updatedPrices = updatedData.reduce((prices, coin) => {
                prices[coin.id] = coin.current_price;
                return prices;
            }, {});

            setCryptoPrices(updatedPrices);
            return updatedData;
        });
    };

    const handleItemClick = (coinId) => {
        const selectedCoin = cryptoData.find((coin) => coin.id === coinId);
        setSelectedCoin(selectedCoin);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <h1>Available Coins</h1>
            <ListGroup>
                {cryptoData.map((coin) => (
                    <CryptoItem
                        key={coin.id}
                        coin={coin}
                        onItemClick={handleItemClick}
                    />
                ))}
            </ListGroup>
            <Modal show={showModal} onHide={handleCloseModal}>
                <CryptoDetail
                    coin={selectedCoin}
                    balance={balance}
                    setBalance={setBalance}
                    ownedCoins={ownedCoins}
                    setOwnedCoins={setOwnedCoins}
                    updatedPrice={cryptoPrices[selectedCoin?.id] || 0}
                />
            </Modal>
        </div>
    );
}

CryptoList.propTypes = {
    setBalance: propTypes.func.isRequired,
    balance: propTypes.number.isRequired
};

export default CryptoList;
