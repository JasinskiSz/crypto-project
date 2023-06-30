/**
 * simulates a price change for a coin
 * @param {number} price
 * @return {number} price after simulation
 */
export function simulatePrice(price) {
    // random value between -1 and 1
    const randomPercentageChange = Math.random() * 2 - 1;
    const priceChange = price * (randomPercentageChange / 100);
    // rounded to 2 decimal places
    return Math.round((price + priceChange) * 100) / 100;
}
