import React, {useEffect, useState} from "react";
import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {getTopTenCryptoData} from "../services/CoinGeckoRestService";
import CryptoDetail from "./CryptoDetail";

/**
 * component representing a list of cryptocurrencies.
 * @return {JSX.Element} The rendered CryptoList component.
 */
function CryptoList() {
    const [cryptoData, setCryptoData] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCryptoData = async () => {
            setCryptoData(await getTopTenCryptoData());
        };

        fetchCryptoData();
    }, []);

    const handleItemClick = (coinId) => {
        const selectedCoin = cryptoData.find((coin) => coin.id === coinId);
        setSelectedCoin(selectedCoin);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Cryptocurrency List</h1>
            <ListGroup>
                {cryptoData.map((coin) => (
                    <ListGroupItem
                        key={coin.id}
                        onClick={() => handleItemClick(coin.id)}
                        action
                    >
                        {coin.symbol.toUpperCase()}
                        <br></br>
                        {coin.current_price} PLN
                    </ListGroupItem>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crypto Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCoin && (
                        <>
                            <CryptoDetail coin={selectedCoin} />
                            <Button variant="primary" disabled>
                                Buy
                            </Button>{" "}
                            <Button variant="danger" disabled>
                                Sell
                            </Button>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CryptoList;
