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

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(
                "Failed to fetch cryptocurrency data. Status: " +
                    response.status
            );
        }
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        if (localData) {
            return localData;
        } else {
            throw new Error(
                "Failed to fetch cryptocurrency data and local data is not available."
            );
        }
    }
}
