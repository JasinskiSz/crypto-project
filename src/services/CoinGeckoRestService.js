import { firestore } from "./Firebase.js";

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
            const jsonData = await response.json();
            const cryptoData = jsonData.slice(0, 10);
            const collectionRef = firestore.collection("cryptos");

            for (const cryptoInfo of cryptoData) {
                try {
                    const docId = cryptoInfo.id;
                    const cryptoDocRef = collectionRef.doc(docId);

                    await cryptoDocRef.set(cryptoInfo, { merge: true });

                    console.log(`Crypto information for ${cryptoInfo.name} updated successfully.`);
                } catch (error) {
                    console.error(`Error updating crypto information for ${cryptoInfo.name}:`, error);
                }
            }

            return jsonData;

        }

        throw new Error(
            "Failed to fetch cryptocurrency data. Status: " +
            response.status
        );
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);

        try {
            const cryptoData = [];
            const querySnapshot = await firestore.collection("cryptos").get();
            querySnapshot.forEach((doc) => {
                cryptoData.push(doc.data());
            });
            return cryptoData;
        } catch (error) {
            console.error("Error getting crypto data from Firestore:", error);
        }
    }
}
