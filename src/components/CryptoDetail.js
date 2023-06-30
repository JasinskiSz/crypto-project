import React from "react";
import PropTypes from "prop-types";

/**
 * renders detailed information about a specific cryptocurrency.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.coin - The cryptocurrency data.
 * @return {JSX.Element} - The rendered component.
 */
function CryptoDetail({coin}) {
    const {name, symbol, market_cap, total_volume} = coin;

    return (
        <div>
            <h3>
                {name} ({symbol.toUpperCase()})
            </h3>
            <p>Market Cap: {market_cap} PLN</p>
            <p>Total Volume: {total_volume} PLN</p>
        </div>
    );
}

CryptoDetail.propTypes = {
    coin: PropTypes.shape({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        market_cap: PropTypes.number.isRequired,
        total_volume: PropTypes.number.isRequired
    }).isRequired
};

export default CryptoDetail;
