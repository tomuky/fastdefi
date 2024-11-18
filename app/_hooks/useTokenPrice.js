import { useBalance, useChainId } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'

const tokenIdMap = {
  'ETH': 'ethereum',
  'WETH': 'ethereum',
  'USDC': 'usd-coin',
  'USDT': 'tether',
  'DAI': 'dai',
  'WBTC': 'wrapped-bitcoin',
  'BTC': 'bitcoin',
  'MATIC': 'matic-network',
  'WMATIC': 'matic-network',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'AAVE': 'aave',
  'CRV': 'curve-dao-token',
  'SNX': 'havven',
  'COMP': 'compound-governance-token',
  'MKR': 'maker',
  'YFI': 'yearn-finance',
  '1INCH': '1inch',
  'SUSHI': 'sushi',
  'GRT': 'the-graph',
}

const chainTokenMap = {
  1: 'ethereum', // Ethereum
  137: 'matic-network', // Polygon
  42161: 'ethereum', // Arbitrum
  10: 'ethereum', // Optimism
  56: 'binancecoin', // BSC
  8453: 'ethereum', // Base
}

const formatPrice = (price) => {
  if (!price) return '$0.00'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const formatLargeValue = (value) => {
  if (!value) return '$0.00'
  
  if (value >= 1_000_000) {
    return `${formatPrice(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return `${formatPrice(value / 1_000)}K`
  }
  return formatPrice(value)
}

const formatBalance = (balance, decimals) => {
  if (!balance) return '0'
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Number(balance))
}

export function useTokenPrice(tokenAddress, userAddress, displayDecimals) {
  const [price, setPrice] = useState(0)
  const [priceLoading, setPriceLoading] = useState(false)
  const [priceError, setPriceError] = useState(null)
  
  const chainId = useChainId()
  const isNativeToken = !tokenAddress

  // Get token metadata and total supply
  const {
    data: tokenData,
    isError: tokenIsError,
    isLoading: tokenIsLoading,
    error: tokenError
  } = useBalance({
    address: tokenAddress || userAddress, // for native token, use user address to get metadata
    token: tokenAddress || undefined, // undefined for native token
  })

  // Get user's balance of the token
  const {
    data: userBalanceData,
    isError: userBalanceIsError,
    isLoading: userBalanceIsLoading,
    error: userBalanceError
  } = useBalance({
    address: userAddress,
    token: tokenAddress || undefined, // undefined for native token
  })

  useEffect(() => {
    const fetchPrice = async () => {
      if (!tokenData?.symbol && !isNativeToken) return
      
      setPriceLoading(true)
      try {
        let coingeckoId
        
        if (isNativeToken) {
          // Use chain ID to get native token's Coingecko ID
          coingeckoId = chainTokenMap[chainId]
          if (!coingeckoId) {
            throw new Error('Unsupported chain')
          }
        } else {
          // Use token symbol for non-native tokens
          coingeckoId = tokenIdMap[tokenData.symbol.toUpperCase()] || tokenData.symbol.toLowerCase()
        }
        
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch price data')
        }
        
        const data = await response.json()
        setPrice(data[coingeckoId]?.usd || 0)
        setPriceError(null)
      } catch (error) {
        setPriceError(error)
        setPrice(0)
      } finally {
        setPriceLoading(false)
      }
    }

    fetchPrice()
  }, [tokenData?.symbol, isNativeToken, chainId])

  const isLoading = tokenIsLoading || priceLoading || userBalanceIsLoading
  const isError = tokenIsError || !!priceError || userBalanceIsError
  const error = tokenError || priceError || userBalanceError || undefined

  if (!tokenData && !isLoading && !isError) {
    return { isLoading, isError }
  }

  // Get raw balances using token's native decimals
  const userBalance = userBalanceData ? formatUnits(userBalanceData.value, userBalanceData.decimals) : '0'
  const userNumericBalance = parseFloat(userBalance)
  const formattedBalance = tokenData ? formatUnits(tokenData.value, tokenData.decimals) : '0'
  const numericBalance = parseFloat(formattedBalance)

  // Calculate monetary values
  const userTotalValue = price * userNumericBalance
  const totalValue = price * numericBalance

  return {
    data: tokenData ? {
      // Token data
      totalSupply: tokenData.value,
      formattedTotalSupply: formatBalance(formattedBalance, displayDecimals),
      symbol: tokenData.symbol,
      decimals: tokenData.decimals,
      
      // Price data (always 2 decimals)
      price,
      formattedPrice: formatPrice(price),
      
      // User holdings data
      userBalance: userBalanceData?.value || 0n,
      userFormattedBalance: formatBalance(userBalance, displayDecimals),
      userTotalValue,
      userFormattedValue: formatPrice(userTotalValue),
      
      // Market data
      totalValue,
      formattedTotalValue: formatLargeValue(totalValue)
    } : undefined,
    isLoading,
    isError,
    error
  }
}