import React, {useState} from "react";
import PropTypes from "prop-types";
import {Modal, Button} from "react-bootstrap";

/**
 * renders detailed information about a specific cryptocurrency.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.coin - The cryptocurrency data.
 * @param {number} props.balance - The player's balance.
 * @param {function} props.setBalance - The function to update the player's balance.
 * @param {Object} props.ownedCoins - The object storing the quantity of owned coins.
 * @param {function} props.setOwnedCoins - The function to update the ownedCoins object.
 * @return {JSX.Element} - The rendered component.
 */
function CryptoDetail({
    coin,
    balance,
    setBalance,
    ownedCoins,
    setOwnedCoins,
    updatedPrice
}) {
    const [quantity, setQuantity] = useState(1);

    const handleSell = () => {
        const sellAmount = quantity * updatedPrice;
        const fee = calculateFee(sellAmount);
        const sellAmountWithFee = sellAmount - fee;
        if (ownedCoins[coin.id] < quantity) {
            alert("Not enough coins owned");
            return;
        }
        setBalance((prevBalance) => prevBalance + sellAmountWithFee);
        setOwnedCoins((prevOwnedCoins) => ({
            ...prevOwnedCoins,
            [coin.id]: prevOwnedCoins[coin.id] - quantity
        }));

        alert(
            `You sold ${quantity} ${coin.name} for ${sellAmount} PLN - ${fee} PLN fee`
        );
    };

    const calculateFee = (price) => {
        if (price < 100) {
            return Math.ceil(price * 0.03);
        } else {
            return Math.ceil(price * 0.005);
        }
    };

    const handleBuy = () => {
        const totalPrice = quantity * updatedPrice;
        const fee = calculateFee(totalPrice);
        const totalPriceWithFee = totalPrice + fee;
        if (balance < totalPriceWithFee) {
            alert("Not enough money");
            return;
        }
        setBalance((prevBalance) => prevBalance - totalPriceWithFee);
        setOwnedCoins((prevOwnedCoins) => ({
            ...prevOwnedCoins,
            [coin.id]: (prevOwnedCoins[coin.id] || 0) + quantity
        }));

        alert(
            `You bought ${quantity} ${coin.name} for ${totalPrice} PLN + ${fee} PLN fee`
        );
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (Number.isNaN(value) || value < 1) {
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    const renderOwnedCoins = () => {
        if (coin.id in ownedCoins) {
            return (
                <span>
                    <strong>Quantity owned: </strong> {ownedCoins[coin.id]}
                </span>
            );
        }
        return null;
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{coin.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {coin && (
                    <>
                        <p>
                            <strong>Current Price:</strong> {updatedPrice} PLN
                        </p>
                        <p>{renderOwnedCoins()}</p>
                        <p>
                            <strong>Quantity to buy/sell:</strong>{" "}
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </p>
                        <Button variant="primary" onClick={handleBuy}>
                            Buy
                        </Button>{" "}
                        <Button variant="danger" onClick={handleSell}>
                            Sell
                        </Button>
                    </>
                )}
            </Modal.Body>
        </>
    );
}

CryptoDetail.propTypes = {
    coin: PropTypes.object,
    balance: PropTypes.number.isRequired,
    setBalance: PropTypes.func.isRequired,
    ownedCoins: PropTypes.object.isRequired,
    setOwnedCoins: PropTypes.func.isRequired,
    updatedPrice: PropTypes.number.isRequired
};

export default CryptoDetail;
