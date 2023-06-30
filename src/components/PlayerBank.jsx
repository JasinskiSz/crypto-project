import React from "react";
import propTypes from "prop-types";

/**
 * this component represents the player's bank.
 * @param {Object} props - The component props.
 * @param {number} props.balance - The player's balance.
 * @return {JSX.Element}
 */
export default function PlayerBank({balance}) {
    return (
        <div>
            <p>Balance: {balance} PLN</p>
        </div>
    );
}

PlayerBank.propTypes = {
    balance: propTypes.number.isRequired
};
