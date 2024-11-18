// Function to fetch token price from CoinGecko
export async function fetchTokenPrice({ 
    tokenId = 'ethereum',  // default to ETH
    currency = 'usd'       // default to USD
} = {}) {

  const COINGECKO_IDS = {
    ETH: 'ethereum',
    USDC: 'usd-coin',
    USDT: 'tether',
    MATIC: 'matic-network',
    BNB: 'binancecoin',
    WETH: 'weth', 
    DAI: 'dai'
  }

  // Check if tokenId matches any key in COINGECKO_IDS
  if (COINGECKO_IDS[tokenId.toUpperCase()]) {
    tokenId = COINGECKO_IDS[tokenId.toUpperCase()]; // Use the corresponding value
  }

  try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${currency}`
      )
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const data = await response.json()
      return data[tokenId][currency]
  } catch (error) {
      console.error('Error fetching price:', error)
      return null
  }
}