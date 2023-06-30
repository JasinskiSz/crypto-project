import localData from "../data/gecko-coins-api.json";

/**
 * fetches cryptocurrency data from CoinGecko API.
 * @module services/CoinGeckoRestService
 * @return {Promise<Object[]>} - The cryptocurrency data.
 */
export async function getTopTenCryptoData() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=10&page=1"
        );
        if (response.status === 419) {
            return localData;
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
    }
}
