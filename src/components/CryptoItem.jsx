import React from "react";
import PropTypes from "prop-types";
import {ListGroupItem} from "react-bootstrap";

/**
 * renders a single cryptocurrency item.
 * @param {Object} props
 * @param {Object} props.coin
 * @param {Function} props.onItemClick
 * @return {JSX.Element} The rendered CryptoItem component.
 */
function CryptoItem({coin, onItemClick}) {
    const handleItemClick = () => {
        onItemClick(coin.id);
    };

    return (
        <ListGroupItem
            className="bg-dark text-white"
            key={coin.id}
            onClick={handleItemClick}
            action
        >
            {coin.symbol.toUpperCase()}
            <br />
            {coin.current_price} PLN
        </ListGroupItem>
    );
}

CryptoItem.propTypes = {
    coin: PropTypes.shape({
        id: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        current_price: PropTypes.number.isRequired
    }).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default CryptoItem;
